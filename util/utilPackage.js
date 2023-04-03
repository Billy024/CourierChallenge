import { _package, packagesWithDeliveryTime } from "../model.js";

export function getPackageDetail(package_array_string) {
  const id = package_array_string[0];
  const weight = parseInt(package_array_string[1]);
  const distance = parseInt(package_array_string[2]);
  const offer_code = package_array_string[3];
  return new _package(id, weight, distance, offer_code);
}

export function filterOverweightPackages(packagesArray, maxCarriableWeight) {
  return packagesArray.filter((_package) => {
    if (_package.weight > maxCarriableWeight) {
      console.error(
        `Package id: ${_package.id} is overweight and cannot be delivered`
      );
    }
    return _package.weight <= maxCarriableWeight;
  });
}

export function sortPackagesByWeightAndDistance(packagesArray) {
  return packagesArray.sort((a, b) => {
    if (a.weight !== b.weight) {
      return b.weight - a.weight;
    } else {
      return a.distance - b.distance;
    }
  });
}

export function findPackagesForMaximumWeight(
  descendingPackageArray,
  maximumNoOfPackages,
  max_carriable_weight,
  maximised_packages,
  sum_of_weight,
  index,
  sum_of_packages
) {
  for (let p = index; p < descendingPackageArray.length; p++) {
    if (sum_of_packages == maximumNoOfPackages) {
      continue;
    }
    let new_weight_sum = sum_of_weight + descendingPackageArray[p].weight;
    if (new_weight_sum < max_carriable_weight) {
      let new_sum_of_packages = sum_of_packages + 1;
      let new_maximised_packages = [
        ...maximised_packages,
        descendingPackageArray[p],
      ];
      const packageObject = findPackagesForMaximumWeight(
        descendingPackageArray,
        maximumNoOfPackages,
        max_carriable_weight,
        new_maximised_packages,
        new_weight_sum,
        p + 1,
        new_sum_of_packages
      );
      if (packageObject.sum_of_packages == maximumNoOfPackages) {
        sum_of_packages = maximumNoOfPackages;
        maximised_packages = [...packageObject.maximised_packages];
      }
    }
  }
  return { sum_of_packages, maximised_packages };
}

export function getMaximumNumberOfPackages(
  max_carriable_weight,
  packagesArray
) {
  packagesArray.sort((a, b) => {
    return a.weight - b.weight;
  });
  let maximumNumberOfPackages = packagesArray.reduce(
    (sum, _package) => {
      if (sum.weight + _package.weight <= max_carriable_weight) {
        sum.weight += _package.weight;
        sum.count++;
      }
      return sum;
    },
    { weight: 0, count: 0 }
  ).count;
  return maximumNumberOfPackages;
}

export function updateDeliveryTimeforPackages(packages, vehicle) {
  let updatedPackages = packages.map((_package) => {
    const deliveryTime = parseFloat(
      (
        vehicle.available_after_time +
        _package.distance / vehicle.max_speed
      ).toFixed(2)
    );
    return new packagesWithDeliveryTime(
      ...Object.values(_package),
      deliveryTime,
      vehicle.id
    );
  });
  return updatedPackages;
}

export function getPackageSchedule(vehicle, remainingPackagesArray) {
  const maximumNoOfPackages = getMaximumNumberOfPackages(
    vehicle.max_carriable_weight,
    remainingPackagesArray
  );
  let descendingPackageArray = sortPackagesByWeightAndDistance(
    remainingPackagesArray
  );
  let maximisedPackages = [];
  let packagesWithMaximumWeight = findPackagesForMaximumWeight(
    descendingPackageArray,
    maximumNoOfPackages,
    vehicle.max_carriable_weight,
    maximisedPackages,
    0,
    0,
    0
  );
  // console.log(packagesWithMaximumWeight, "packagesWithMaximumWeight");
  return packagesWithMaximumWeight;
}

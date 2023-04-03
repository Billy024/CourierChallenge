import {
  packagesWithDeliveryTime,
  vehicle,
  vehicleWithDeliveryTime,
} from "../model.js";
import { promptQuestion, splitStringtoArray } from "./utilShared.js";

export async function getVehicleData(vehicle_question, input_quantity) {
  const vehicleAnswer = await promptQuestion(vehicle_question);
  const vehicleStringArray = splitStringtoArray(vehicleAnswer, input_quantity);
  return getVehicleArray(vehicleStringArray);
}

export function getVehicleArray(vehicle_array_string) {
  const no_of_vehicles = parseInt(vehicle_array_string[0]);
  const max_speed = parseInt(vehicle_array_string[1]);
  const max_carriable_weight = parseInt(vehicle_array_string[2]);
  let vehicleData = [];
  for (let i = 0; i < no_of_vehicles; i++) {
    vehicleData.push(new vehicle(max_speed, max_carriable_weight, i + 1));
  }
  return vehicleData;
}

export function sortPackages(vehicles, packagesArray) {
  let unsortedPackages = packagesArray;
  let vehiclesWithAvailability =
    initializeVehicleswithAvailabilityTime(vehicles);

  while (unsortedPackages.length != 0) {
    vehiclesWithAvailability = sortVehiclesByAvailableAfterTime(
      vehiclesWithAvailability
    );
    const packageObject = getPackageSchedule(
      vehiclesWithAvailability[0],
      unsortedPackages
    );
    const packagesWithDeliveryTime = updateDeliveryTimeforPackages(
      packageObject.maximised_packages,
      vehiclesWithAvailability[0]
    );
    vehiclesWithAvailability[0].available_after_time = findMaxDeliveryTime(
      packagesWithDeliveryTime
    );
    console.log(packagesWithDeliveryTime, "new package");
    unsortedPackages = unsortedPackages.filter((unsortedPackage) => {
      return !packageObject.maximised_packages.includes(unsortedPackage);
    });
    console.log(unsortedPackages, "unsortedPackages");
  }
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
  return findPackagesForMaximumWeight(
    descendingPackageArray,
    maximumNoOfPackages,
    vehicle.max_carriable_weight,
    maximisedPackages,
    0,
    0,
    0
  );
}

export function initializeVehicleswithAvailabilityTime(vehicles) {
  return vehicles.map((vehicle) => {
    return new vehicleWithDeliveryTime(...Object.values(vehicle), 0);
  });
}

export function sortVehiclesByAvailableAfterTime(vehicles) {
  return vehicles.sort((a, b) => {
    a.available_after_time - b.available_after_time;
  });
}

export function findMaxDeliveryTime(packages) {
  return packages.reduce((maxDeliveryTime, _package) => {
    return _package.delivery_time > maxDeliveryTime
      ? _package.delivery_time
      : maxDeliveryTime;
  }, 0);
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
  return packagesArray.reduce(
    (sum, _package) => {
      if (sum.weight + _package.weight <= max_carriable_weight) {
        sum.weight += _package.weight;
        sum.count++;
      }
      return sum;
    },
    { weight: 0, count: 0 }
  ).count;
}

export function updateDeliveryTimeforPackages(packages, vehicle) {
  return packages.map((_package) => {
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
}

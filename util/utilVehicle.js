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

//while loop to get second trip of vehicles
//pending adding delivery time to each package (speed of vehicle * distance of package)
export function sortPackages(vehicles, packagesArray) {
  let unsortedPackages = packagesArray;
  let vehiclesWithAvailability =
    initializeVehicleswithAvailabilityTime(vehicles);

  while (unsortedPackages.length != 0) {
    let sortedVehiclesWithAvailability = sortVehiclesByAvailableAfterTime(
      vehiclesWithAvailability
    );
    let {
      packagesWithDeliveryTime,
      remainingPackages,
      vehicleMaxDeliveryTime,
    } = getPackageSchedule(sortedVehiclesWithAvailability[0], unsortedPackages);
    sortedVehiclesWithAvailability[0].available_after_time =
      vehicleMaxDeliveryTime;
    unsortedPackages = remainingPackages;
    vehiclesWithAvailability = sortedVehiclesWithAvailability;
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
  const packageObject = findPackagesForMaximumWeight(
    descendingPackageArray,
    maximumNoOfPackages,
    vehicle.max_carriable_weight,
    maximisedPackages,
    0,
    0,
    0
  );
  const packagesWithDeliveryTime = updateDeliveryTimeforPackages(
    packageObject.maximised_packages,
    vehicle
  );
  const vehicleMaxDeliveryTime = findMaxDeliveryTime(packagesWithDeliveryTime);
  console.log(packagesWithDeliveryTime, "new package");
  console.log(vehicleMaxDeliveryTime, "max delivery time");
  let remainingPackages = remainingPackagesArray.filter(
    (unsortedPackage) =>
      !packageObject.maximised_packages.includes(unsortedPackage)
  );
  return {
    packagesWithDeliveryTime,
    remainingPackages,
    vehicleMaxDeliveryTime,
  };
}

export function initializeVehicleswithAvailabilityTime(vehicles) {
  let available_after_time = 0;
  return vehicles.map((vehicle) => {
    let vehicleValues = Object.values(vehicle);
    return new vehicleWithDeliveryTime(...vehicleValues, available_after_time);
  });
}

export function updateVehiclesWithAvailabilityTime(
  vehicles,
  vehicle_id,
  new_available_after_time
) {
  return vehicles.map((vehicle) => {
    if (vehicle.id == vehicle_id) {
      vehicle.available_after_time = new_available_after_time;
    }
  });
}

export function sortVehiclesByAvailableAfterTime(vehicles) {
  return vehicles.sort((a, b) => {
    a.available_after_time - b.available_after_time;
  });
}

export function findMaxDeliveryTime(packages) {
  return packages.reduce((max, _package) => {
    return _package.delivery_time > max ? _package.delivery_time : max;
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
  let sum_of_weight = 0;
  let no_of_packages = 0;
  packagesArray.map((_package) => {
    let new_weight = sum_of_weight + _package.weight;
    if (new_weight < max_carriable_weight) {
      no_of_packages += 1;
      sum_of_weight += _package.weight;
      return;
    }
  });
  return no_of_packages;
}

export function updateDeliveryTimeforPackages(packages, vehicle) {
  return packages.map((_package) => {
    const deliveryTime = (_package.distance / vehicle.max_speed).toFixed(2);
    const _packageValues = Object.values(_package);
    return new packagesWithDeliveryTime(
      ..._packageValues,
      deliveryTime,
      vehicle.id
    );
  });
}

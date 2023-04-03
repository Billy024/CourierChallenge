import { vehicle } from "../model.js";
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
    vehicleData.push(new vehicle(max_speed, max_carriable_weight));
  }
  return vehicleData;
}

//while loop to get second trip of vehicles
//pending adding delivery time to each package (speed of vehicle * distance of package)
export function sortPackages(vehicles, packagesArray) {
  let unsortedPackages = packagesArray;
  // let i = 0;
  // //need to rectify while loop
  while (unsortedPackages.length != 0) {
    let sortedPackages = getPackageSchedule(vehicles, unsortedPackages);
    console.log(sortedPackages, "sorted");
    unsortedPackages = unsortedPackages.filter(
      (_package) => !sortedPackages.includes(_package)
    );
    console.log(unsortedPackages, "unsorted");
  }
  //   let deliverySortedPackages = sortPackages(vehicleDataArray, packageDataArray);
  //   i++;
  //   console.log(i);
  //need to handle delivery time of packages here
}

export function getPackageSchedule(vehicles, packagesArray) {
  let tempPackagesArray = packagesArray;
  let totalSortedPackages = [];
  vehicles.map((vehicle) => {
    const maximumNoOfPackages = getMaximumNumberOfPackages(
      vehicles[0].max_carriable_weight,
      tempPackagesArray
    );
    let descendingPackageArray = tempPackagesArray.sort((a, b) => {
      if (a.weight !== b.weight) {
        return b.weight - a.weight;
      } else {
        return a.distance - b.distance;
      }
    });
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
    tempPackagesArray = tempPackagesArray.filter(
      (tempPackage) => !packageObject.maximised_packages.includes(tempPackage)
    );
    totalSortedPackages = [
      ...totalSortedPackages,
      ...packageObject.maximised_packages,
    ];
  });
  return totalSortedPackages;
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

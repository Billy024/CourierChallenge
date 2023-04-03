import { findMaxDeliveryTime } from "./utilDelivery.js";
import {
  filterOverweightPackages,
  getPackageSchedule,
  updateDeliveryTimeforPackages,
} from "./utilPackage.js";
import {
  initializeVehicleswithAvailabilityTime,
  sortVehiclesByAvailableAfterTime,
} from "./utilVehicle.js";

export function getDeliverySortedPackages(vehicles, packagesArray) {
  let vehiclesWithAvailability =
    initializeVehicleswithAvailabilityTime(vehicles);
  let unsortedPackages = filterOverweightPackages(
    packagesArray,
    vehicles[0].max_carriable_weight
  );
  let deliverySortedPackages = [];
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
    console.log(vehiclesWithAvailability, "vehiclesWithAvailability");
    unsortedPackages = unsortedPackages.filter((unsortedPackage) => {
      return !packageObject.maximised_packages.includes(unsortedPackage);
    });
    deliverySortedPackages = [
      ...deliverySortedPackages,
      ...packagesWithDeliveryTime,
    ];
    console.log(deliverySortedPackages, "deliverySortedPackages");
  }
  return deliverySortedPackages;
}

import { deliverySortingController } from "../../controllers/deliverySortingController.js";
import { getPackageSchedule } from "../packages/getPackageSchedule.js";
import { updateDeliveryTimeForPackages } from "../packages/updateDeliveryTimeForPackages.js";
import { filterOverweightPackages } from "../packages/utilPackage.js";
import {
  initializeVehicleswithAvailabilityTime,
  sortVehiclesByAvailableAfterTime,
} from "../vehicles/utilVehicle.js";

export function getDeliverySortedPackages(vehicles, packagesArray) {
  const deliverySorter = new deliverySortingController();
  let vehiclesWithAvailability =
    initializeVehicleswithAvailabilityTime(vehicles);
  let unsortedPackages = filterOverweightPackages(
    packagesArray,
    vehicles[0].max_carriable_weight
  );
  let deliverySortedPackages = [];

  //looping through unsorted packages till all packages are sorted
  while (unsortedPackages.length != 0) {
    vehiclesWithAvailability = sortVehiclesByAvailableAfterTime(
      vehiclesWithAvailability
    );
    const packageObject = getPackageSchedule(
      vehiclesWithAvailability[0],
      unsortedPackages
    );
    const packagesWithDeliveryTime = updateDeliveryTimeForPackages(
      packageObject.maximised_packages,
      vehiclesWithAvailability[0]
    );
    vehiclesWithAvailability[0].available_after_time =
      deliverySorter._findMaxDeliveryTime(packagesWithDeliveryTime);
    unsortedPackages = unsortedPackages.filter((unsortedPackage) => {
      return !packageObject.maximised_packages.includes(unsortedPackage);
    });
    deliverySortedPackages = [
      ...deliverySortedPackages,
      ...packagesWithDeliveryTime,
    ];
  }

  return deliverySortedPackages;
}

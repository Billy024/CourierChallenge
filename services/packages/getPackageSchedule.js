import { findPackagesForMaximumWeight } from "./findPackagesForMaximumWeight.js";
import { getMaximumNumberOfPackages } from "./getMaximumNumberOfPackages.js";
import { sortPackagesByWeightAndDistance } from "./utilPackage.js";

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
  return packagesWithMaximumWeight;
}

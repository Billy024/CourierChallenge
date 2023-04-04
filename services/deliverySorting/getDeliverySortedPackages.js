export function getDeliverySortedPackages(vehicles, packagesArray) {
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
    vehiclesWithAvailability[0].available_after_time = findMaxDeliveryTime(
      packagesWithDeliveryTime
    );
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
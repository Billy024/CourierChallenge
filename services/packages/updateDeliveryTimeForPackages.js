import { packagesWithDeliveryTime } from "../../models/packagesWithDeliveryTime.js";

export function updateDeliveryTimeForPackages(packages, vehicle) {
  let updatedPackages = packages.map((_package) => {
    const deliveryTime =
      Math.floor(
        (vehicle.available_after_time + _package.distance / vehicle.max_speed) *
          100
      ) / 100;
    return new packagesWithDeliveryTime(
      ...Object.values(_package),
      deliveryTime,
      vehicle.id
    );
  });
  return updatedPackages;
}

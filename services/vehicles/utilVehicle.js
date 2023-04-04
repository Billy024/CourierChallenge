import { vehicleWithDeliveryTime } from "../../model.js";

export function initializeVehicleswithAvailabilityTime(vehicles) {
  return vehicles.map((vehicle) => {
    return new vehicleWithDeliveryTime(...Object.values(vehicle), 0);
  });
}

export function sortVehiclesByAvailableAfterTime(vehicles) {
  return vehicles.sort((a, b) => {
    return a.available_after_time - b.available_after_time;
  });
}

import { vehicle } from "../../models/vehicle.js";

export function getVehicleDetail(vehicle_array_string) {
  const vehicle_array_int = vehicle_array_string.map((str) => parseInt(str));
  let vehicleData = [];
  for (
    let vehicleCount = 0;
    vehicleCount < vehicle_array_int[0];
    vehicleCount++
  ) {
    vehicleData.push(
      new vehicle(vehicle_array_int[1], vehicle_array_int[2], vehicleCount + 1)
    );
  }
  return vehicleData;
}

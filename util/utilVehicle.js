import { vehicle } from "../model.js";
import { promptQuestion, splitStringtoArray } from "./utilShared.js";

export async function getVehicleData(vehicle_question, input_quantity) {
  const vehicleAnswer = await promptQuestion(vehicle_question);
  const vehicleArray = splitStringtoArray(vehicleAnswer, input_quantity);
  return getVehicleDetail(vehicleArray);
}

export function getVehicleDetail(vehicle_array_string) {
  const no_of_vehicles = parseInt(vehicle_array_string[0]);
  const max_speed = parseInt(vehicle_array_string[1]);
  const max_carriable_weight = parseInt(vehicle_array_string[2]);
  return new vehicle(no_of_vehicles, max_speed, max_carriable_weight);
}

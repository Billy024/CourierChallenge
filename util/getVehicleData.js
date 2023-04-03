import { promptQuestion, splitStringtoArray } from "./utilShared.js";
import { getVehicleArray } from "./utilVehicle.js";

export async function getVehicleData(vehicle_question, input_quantity) {
  const vehicleAnswer = await promptQuestion(vehicle_question);
  const vehicleStringArray = splitStringtoArray(vehicleAnswer, input_quantity);
  return getVehicleArray(vehicleStringArray);
}

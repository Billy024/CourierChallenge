import { promptQuestion } from "../terminal/promptQuestion.js";
import { splitStringtoArray } from "../terminal/utilTerminal.js";
import { getVehicleArray } from "./getVehicleArray.js";

export async function getVehicleData(vehicle_question, input_quantity) {
  const vehicleAnswer = await promptQuestion(vehicle_question);
  const vehicleStringArray = splitStringtoArray(vehicleAnswer, input_quantity);
  return getVehicleArray(vehicleStringArray);
}

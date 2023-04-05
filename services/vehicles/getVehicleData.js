import { promptQuestion } from "../terminal/promptQuestion.js";
import { splitStringtoArray } from "../terminal/utilTerminal.js";
import { getVehicleDetail } from "./getVehicleDetail.js";

export async function getVehicleData(
  vehicle_question,
  input_quantity,
  promptFn = promptQuestion
) {
  const vehicleAnswer = await promptFn(vehicle_question);
  const vehicleStringArray = splitStringtoArray(vehicleAnswer, input_quantity);
  return getVehicleDetail(vehicleStringArray);
}

import { promptQuestion } from "../terminal/promptQuestion.js";
import { splitStringtoArray } from "../terminal/utilTerminal.js";
import { getVehicleDetail } from "./getVehicleDetail.js";

export async function getVehicleData(
  vehicle_question,
  input_quantity,
  promptFn = promptQuestion
) {
  let validInput = true;
  const vehicleAnswer = await promptFn(vehicle_question);
  const vehicleArray = splitStringtoArray(vehicleAnswer, input_quantity);
  if (vehicleArray.length != input_quantity) {
    validInput = false;
  }
  const vehicleDetail = getVehicleDetail(vehicleArray);
  return { vehicleData: vehicleDetail, validVehicleInput: validInput };
}

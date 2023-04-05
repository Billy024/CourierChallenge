import { splitStringtoArray } from "../terminal/utilTerminal.js";
import { getDeliveryDetail } from "./getDeliveryDetail.js";
import { promptQuestion } from "../terminal/promptQuestion.js";

export async function getDeliveryData(
  delivery_question,
  input_quantity,
  promptFn = promptQuestion
) {
  let validInput = true;
  const deliveryAnswer = await promptFn(delivery_question);
  const deliveryArray = splitStringtoArray(deliveryAnswer, input_quantity);
  if (deliveryArray.length != input_quantity) {
    validInput = false;
  }
  const deliveryDetail = getDeliveryDetail(deliveryArray);
  return { deliveryData: deliveryDetail, validDeliveryInput: validInput };
}

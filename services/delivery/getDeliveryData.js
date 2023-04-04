import { splitStringtoArray } from "../terminal/utilTerminal.js";
import { getDeliveryDetail } from "./getDeliveryDetail.js";
import { promptQuestion } from "../terminal/promptQuestion.js";

export async function getDeliveryData(
  delivery_question,
  input_quantity,
  promptFn = promptQuestion
) {
  const deliveryAnswer = await promptFn(delivery_question);
  const deliveryArray = splitStringtoArray(deliveryAnswer, input_quantity);
  return getDeliveryDetail(deliveryArray);
}

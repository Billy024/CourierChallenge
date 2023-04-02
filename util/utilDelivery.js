import { delivery } from "../model.js";
import { promptQuestion, splitStringtoArray } from "./utilShared.js";

export async function getDeliveryData(delivery_question, input_quantity) {
  const deliveryAnswer = await promptQuestion(delivery_question);
  const deliveryArray = splitStringtoArray(deliveryAnswer, input_quantity);
  return getDeliveryDetail(deliveryArray);
}

export function getDeliveryDetail(delivery_array_string) {
  const base_delivery_cost = parseInt(delivery_array_string[0]);
  const no_of_packages = parseInt(delivery_array_string[1]);
  return new delivery(base_delivery_cost, no_of_packages);
}

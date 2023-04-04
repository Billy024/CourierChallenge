export async function getDeliveryData(delivery_question, input_quantity) {
  const deliveryAnswer = await promptQuestion(delivery_question);
  const deliveryArray = splitStringtoArray(deliveryAnswer, input_quantity);
  return getDeliveryDetail(deliveryArray);
}

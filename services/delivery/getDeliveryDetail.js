import { delivery } from "../../model.js";

export function getDeliveryDetail(delivery_array_string) {
  const delivery_array_int = delivery_array_string.map((str) => parseInt(str));
  return new delivery(...delivery_array_int);
}

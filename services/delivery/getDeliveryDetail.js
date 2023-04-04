export function getDeliveryDetail(delivery_array_string) {
  const base_delivery_cost = parseInt(delivery_array_string[0]);
  const no_of_packages = parseInt(delivery_array_string[1]);
  return new delivery(base_delivery_cost, no_of_packages);
}

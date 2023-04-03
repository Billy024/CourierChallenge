import { delivery } from "../model.js";

export function getDeliveryDetail(delivery_array_string) {
  const base_delivery_cost = parseInt(delivery_array_string[0]);
  const no_of_packages = parseInt(delivery_array_string[1]);
  return new delivery(base_delivery_cost, no_of_packages);
}

export function findMaxDeliveryTime(packages) {
  let oneWayMaxDeliveryTime = packages.reduce((maxDeliveryTime, _package) => {
    return _package.delivery_time > maxDeliveryTime
      ? _package.delivery_time
      : maxDeliveryTime;
  }, 0);
  return oneWayMaxDeliveryTime * 2;
}

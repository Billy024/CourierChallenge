export function findMaxDeliveryTime(packages) {
  let oneWayMaxDeliveryTime = packages.reduce((maxDeliveryTime, _package) => {
    return _package.delivery_time > maxDeliveryTime
      ? _package.delivery_time
      : maxDeliveryTime;
  }, 0);
  return oneWayMaxDeliveryTime * 2;
}

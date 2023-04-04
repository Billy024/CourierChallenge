const deliveryData = await getDeliveryData(
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY
);
const packageDataArray = await getPackagesData(
  deliveryData.no_of_packages,
  PACKAGE_QUESTION,
  PACKAGE_INPUT_QUANTITY
);

const vehicleDataArray = await getVehicleData(
  VEHICLE_QUESTION,
  VEHICLE_INPUT_QUANTITY
);

const discountAndTotalCost = getDiscountAndTotalCost(
  packageDataArray,
  deliveryData.base_delivery_cost,
  offerCodes
);

let deliverySortedPackages = getDeliverySortedPackages(
  vehicleDataArray,
  packageDataArray
);

outputDiscountAndTotalCost(discountAndTotalCost, deliverySortedPackages);

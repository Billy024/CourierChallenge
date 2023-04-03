import {
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY,
  PACKAGE_INPUT_QUANTITY,
  PACKAGE_QUESTION,
  VEHICLE_INPUT_QUANTITY,
  VEHICLE_QUESTION,
} from "./constants.js";
import { _package } from "./model.js";
import { offerCodes } from "./offerCodes.js";
import { getDeliveryData } from "./util/utilDelivery.js";
import {
  getDiscountAndTotalCost,
  outputDiscountAndTotalCost,
} from "./util/utilDiscount.js";
import { getPackagesData } from "./util/utilPackage.js";
import {
  getPackageSchedule,
  getVehicleData,
  sortPackages,
} from "./util/utilVehicle.js";

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

let deliverySortedPackages = sortPackages(vehicleDataArray, packageDataArray);
//need to handle delivery time of packages here

outputDiscountAndTotalCost(discountAndTotalCost, deliverySortedPackages);

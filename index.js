import {
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY,
  PACKAGE_INPUT_QUANTITY,
  PACKAGE_QUESTION,
  VEHICLE_INPUT_QUANTITY,
  VEHICLE_QUESTION,
} from "./constants.js";
import { offerCodes } from "./offerCodes.js";
import { getDeliveryData } from "./util/utilDelivery.js";
import {
  getDiscountAndTotalCost,
  outputDiscountAndTotalCost,
} from "./util/utilDiscount.js";
import { getPackagesData } from "./util/utilPackage.js";

const deliveryData = await getDeliveryData(
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY
);
const packageDataArray = await getPackagesData(
  deliveryData.no_of_packages,
  PACKAGE_QUESTION,
  PACKAGE_INPUT_QUANTITY
);

const vehicleDetail = await getVehicleData(
  VEHICLE_QUESTION,
  VEHICLE_INPUT_QUANTITY
);

const discountAndTotalCost = getDiscountAndTotalCost(
  packageDataArray,
  deliveryData.base_delivery_cost,
  offerCodes
);

outputDiscountAndTotalCost(discountAndTotalCost);

import {
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY,
  PACKAGE_INPUT_QUANTITY,
  PACKAGE_QUESTION,
  VEHICLE_INPUT_QUANTITY,
  VEHICLE_QUESTION,
} from "./constants.js";
import { offerCodes } from "./offerCodes.js";
import { getDeliveryData } from "./util/getDeliveryData.js";
import { getDeliverySortedPackages } from "./util/getDeliverySortedPackages.js";
import { getDiscountAndTotalCost } from "./util/getDiscountAndTotalCost.js";
import { getPackagesData } from "./util/getPackagesData.js";
import { getVehicleData } from "./util/getVehicleData.js";
import { outputDiscountAndTotalCost } from "./util/utilShared.js";

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

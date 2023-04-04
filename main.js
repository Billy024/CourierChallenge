import {
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY,
  PACKAGE_INPUT_QUANTITY,
  PACKAGE_QUESTION,
  VEHICLE_INPUT_QUANTITY,
  VEHICLE_QUESTION,
} from "./constants.js";
import { getPackagesData } from "./services/packages/getPackagesData.js";
import { getDeliveryData } from "./services/delivery/getDeliveryData.js";
import { getVehicleData } from "./services/vehicles/getVehicleData.js";
import { getDiscountAndTotalCost } from "./services/discount/getDiscountAndTotalCost.js";
import { getDeliverySortedPackages } from "./services/deliverySorting/getDeliverySortedPackages.js";
import { outputDiscountAndTotalCost } from "./services/terminal/outputDiscountAndTotalCost.js";
import { offerCodes } from "./offerCodes.js";

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

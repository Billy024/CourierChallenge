import {
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY,
  PACKAGE_INPUT_QUANTITY,
  PACKAGE_QUESTION,
  VEHICLE_INPUT_QUANTITY,
  VEHICLE_QUESTION,
} from "./constants.js";
import { offerCodes } from "./offerCodes.js";
import { terminalController } from "./controllers/terminalController.js";
import { deliverySortingController } from "./controllers/deliverySortingController.js";
import { costCalculatingController } from "./controllers/costCalculatingController.js";

const terminal = new terminalController();
const deliverySorter = new deliverySortingController();
const costCalculator = new costCalculatingController();

const deliveryData = await terminal._getDeliveryData(
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY
);
const packageDataArray = await terminal._getPackagesData(
  deliveryData.no_of_packages,
  PACKAGE_QUESTION,
  PACKAGE_INPUT_QUANTITY
);
const vehicleDataArray = await terminal._getVehicleData(
  VEHICLE_QUESTION,
  VEHICLE_INPUT_QUANTITY
);
const discountAndTotalCost = costCalculator._getDiscountAndTotalCost(
  packageDataArray,
  deliveryData.base_delivery_cost,
  offerCodes
);
let deliverySortedPackages = deliverySorter._getDeliverySortedPackages(
  vehicleDataArray,
  packageDataArray
);
terminal._outputDiscountAndTotalCost(
  discountAndTotalCost,
  deliverySortedPackages
);

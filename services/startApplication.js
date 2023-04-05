import {
  DELIVERY_QUESTION,
  DETAIL_INPUT_QUANTITY,
  PACKAGE_INPUT_QUANTITY,
  PACKAGE_QUESTION,
  VEHICLE_INPUT_QUANTITY,
  VEHICLE_QUESTION,
} from "../constants.js";
import { offerCodes } from "../offerCodes.js";
import { terminalController } from "../controllers/terminalController.js";
import { deliverySortingController } from "../controllers/deliverySortingController.js";
import { costCalculatingController } from "../controllers/costCalculatingController.js";

export async function startApplication() {
  const terminal = new terminalController();
  const deliverySorter = new deliverySortingController();
  const costCalculator = new costCalculatingController();

  const { deliveryData, validDeliveryInput } = await terminal._getDeliveryData(
    DELIVERY_QUESTION,
    DETAIL_INPUT_QUANTITY
  );

  if (validDeliveryInput == false) {
    return console.error("Insufficient Delivery Details");
  }

  const { packageData, validPackageInput } = await terminal._getPackagesData(
    deliveryData.no_of_packages,
    PACKAGE_QUESTION,
    PACKAGE_INPUT_QUANTITY
  );

  if (validPackageInput == false) {
    return console.error("Insufficient Package Details");
  }

  const { vehicleData, validVehicleInput } = await terminal._getVehicleData(
    VEHICLE_QUESTION,
    VEHICLE_INPUT_QUANTITY
  );

  if (validVehicleInput == false) {
    return console.error("Insufficient Vehicle Details");
  }

  const discountAndTotalCost = costCalculator._getDiscountAndTotalCost(
    packageData,
    deliveryData.base_delivery_cost,
    offerCodes
  );

  let deliverySortedPackages = deliverySorter._getDeliverySortedPackages(
    vehicleData,
    packageData
  );

  terminal._outputDiscountAndTotalCost(
    discountAndTotalCost,
    deliverySortedPackages
  );
}

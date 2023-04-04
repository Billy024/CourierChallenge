import { outputDiscountAndTotalCost } from "../services/terminal/outputDiscountAndTotalCost.js";
import { getDeliveryData } from "../services/delivery/getDeliveryData.js";
import { getPackagesData } from "../services/packages/getPackagesData.js";
import { getVehicleData } from "../services/vehicles/getVehicleData.js";

export class terminalController {
  _outputDiscountAndTotalCost(discountAndTotalCost, deliverySortedPackages) {
    outputDiscountAndTotalCost(discountAndTotalCost, deliverySortedPackages);
  }
  _getDeliveryData(delivery_question, detail_input_quantity) {
    return getDeliveryData(delivery_question, detail_input_quantity);
  }
  _getPackagesData(no_of_packages, package_question, package_input_quantity) {
    return getPackagesData(
      no_of_packages,
      package_question,
      package_input_quantity
    );
  }
  _getVehicleData(vehicle_question, vehicle_input_quantity) {
    return getVehicleData(vehicle_question, vehicle_input_quantity);
  }
}

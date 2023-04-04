import { outputDiscountAndTotalCost } from "../services/terminal/outputDiscountAndTotalCost.js";
import { getDiscountAndTotalCost } from "../services/discount/getDiscountAndTotalCost.js";

export class costCalculatingController {
  _getDiscountAndTotalCost(packageDataArray, base_delivery_cost, offerCodes) {
    return getDiscountAndTotalCost(
      packageDataArray,
      base_delivery_cost,
      offerCodes
    );
  }
  _outputDiscountAndTotalCost(discountAndTotalCost, deliverySortedPackages) {
    return outputDiscountAndTotalCost(
      discountAndTotalCost,
      deliverySortedPackages
    );
  }
}

import { discountedCost } from "../../models/discountedCost.js";
import { canUseOfferCode } from "./canUseOfferCode.js";
import { getDeliveryCost, getDiscountAmount } from "./utilDiscount.js";

export function getDiscountAndTotalCost(packagesArray, base_cost, offerCodes) {
  let costArray = [];
  packagesArray.map((_package) => {
    const deliveryCost = getDeliveryCost(
      base_cost,
      _package.weight,
      _package.distance
    );
    if (
      !_package.offer_code ||
      !canUseOfferCode(
        _package.weight,
        _package.distance,
        _package.offer_code,
        offerCodes
      )
    ) {
      return costArray.push(new discountedCost(_package.id, 0, deliveryCost));
    }

    const discount_amount = getDiscountAmount(
      _package.offer_code,
      offerCodes,
      deliveryCost
    );

    costArray.push(
      new discountedCost(
        _package.id,
        discount_amount,
        deliveryCost - discount_amount
      )
    );
  });
  return costArray;
}

import { _discountedCost } from "../model.js";

export function getDeliveryCost(base_delivery_cost, weight, distance) {
  return base_delivery_cost + weight * 10 + distance * 5;
}

export function canUseOfferCode(
  weight,
  distance,
  offer_code,
  available_offer_codes
) {
  let validity = available_offer_codes
    .filter((offerCode) => offerCode.name == offer_code)
    .map((filteredOfferCode) => {
      if (weight < filteredOfferCode.minWeight) {
        return false;
      }
      if (weight > filteredOfferCode.maxWeight) {
        return false;
      }
      if (distance < filteredOfferCode.minDistance) {
        return false;
      }
      if (distance > filteredOfferCode.maxDistance) {
        return false;
      }
      return true;
    });

  if (validity.length == 0) {
    console.error(`OfferCode: ${offer_code} is invalid`);
    return false;
  }

  if (validity.length > 1) {
    console.error(`Duplicated OfferCode:${offer_code} found`);
    return false;
  }
  return validity[0];
}

export function getDiscountAmount(
  offer_code,
  available_offer_codes,
  total_cost
) {
  const discountPercentage = available_offer_codes.filter(
    (availableOfferCode) => availableOfferCode.name == offer_code
  )[0].discountPercentage;
  return parseFloat(((discountPercentage / 100) * total_cost).toFixed(2));
}

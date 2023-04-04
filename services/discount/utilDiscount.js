export function getDeliveryCost(base_delivery_cost, weight, distance) {
  return base_delivery_cost + weight * 10 + distance * 5;
}

export function getDiscountAmount(
  offer_code,
  available_offer_codes,
  total_cost
) {
  const discountPercentage = available_offer_codes.filter(
    (availableOfferCode) => availableOfferCode.name == offer_code
  )[0].discountPercentage;
  return Math.floor((discountPercentage / 100) * total_cost * 100) / 100;
}

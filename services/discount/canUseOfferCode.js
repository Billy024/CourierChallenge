export function canUseOfferCode(
  weight,
  distance,
  offer_code,
  available_offer_codes
) {
  let validity = available_offer_codes
    .filter((offerCode) => {
      return offerCode.name == offer_code;
    })
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

  if (validity.length == 0 && offer_code != "NA") {
    console.warn(`OfferCode: ${offer_code} is invalid`);
    return false;
  }

  if (validity.length > 1) {
    console.warn(`Duplicated OfferCode:${offer_code} found`);
    return false;
  }
  return validity[0];
}

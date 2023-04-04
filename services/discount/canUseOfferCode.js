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
      console.log(
        filteredOfferCode.minDistance,
        "filteredOfferCode.minDistance"
      );

      if (weight < filteredOfferCode.minWeight) {
        console.log("1");
        return false;
      }
      if (weight > filteredOfferCode.maxWeight) {
        console.log("2");
        return false;
      }
      if (distance < filteredOfferCode.minDistance) {
        console.log("3");
        return false;
      }
      if (distance > filteredOfferCode.maxDistance) {
        console.log("4");
        return false;
      }
      return true;
    });

  if (validity.length == 0) {
    console.warn(`OfferCode: ${offer_code} is invalid`);
    return false;
  }

  if (validity.length > 1) {
    console.warn(`Duplicated OfferCode:${offer_code} found`);
    return false;
  }
  return validity[0];
}

import { _discountedCost } from "../model.js";

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
      return costArray.push(new _discountedCost(_package.id, 0, deliveryCost));
    }

    const discount_amount = getDiscountAmount(
      _package.offer_code,
      offerCodes,
      deliveryCost
    );

    costArray.push(
      new _discountedCost(
        _package.id,
        discount_amount,
        deliveryCost - discount_amount
      )
    );
  });
  return costArray;
}

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

export function outputDiscountAndTotalCost(
  discountAndTotalCost,
  deliverySortedPackages
) {
  discountAndTotalCost.map((eachPackage) => {
    let thisDeliverySortedPackage = deliverySortedPackages.filter(
      (deliverySortedPackage) =>
        deliverySortedPackage.id == eachPackage.package_id
    )[0];
    let finalString = Object.values(eachPackage).reduce(
      (outputString, outputItem) => {
        return (outputString += `${outputItem} `);
      },
      ""
    );
    if (thisDeliverySortedPackage?.delivery_time) {
      console.log(
        (finalString + `${thisDeliverySortedPackage.delivery_time}`).trim()
      );
    } else {
      console.log(finalString.trim());
    }
  });
}
// }

export class offerCode {
  constructor(
    name,
    minDistance,
    maxDistance,
    minWeight,
    maxWeight,
    discountPercentage
  ) {
    this.name = name;
    this.minDistance = minDistance;
    this.maxDistance = maxDistance;
    this.minWeight = minWeight;
    this.maxWeight = maxWeight;
    this.discountPercentage = discountPercentage;
  }
}

export const offerCodes = [
  new offerCode("OFR001", 0, 200, 70, 200, 10),
  new offerCode("OFR002", 50, 150, 100, 250, 7),
  new offerCode("OFR003", 50, 250, 10, 150, 5),
];

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

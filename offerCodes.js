import { offerCode } from "./models/offerCode.js";

//add new offercodes in this format:
//new offerCode("offerCode", minDistance, maxDistance, minWeight, maxWeight, discountPercentage),

export const offerCodes = [
  new offerCode("OFR001", 0, 200, 70, 200, 10),
  new offerCode("OFR002", 50, 150, 100, 250, 7),
  new offerCode("OFR003", 50, 250, 10, 150, 5),
];

import { expect as _expect } from "chai";
import { discountedCost } from "../models/discountedCost.js";
import { _package } from "../models/package.js";
import { getDiscountAndTotalCost } from "../services/discount/getDiscountAndTotalCost.js";
import {
  getDeliveryCost,
  getDiscountAmount,
} from "../services/discount/utilDiscount.js";
import { canUseOfferCode } from "../services/discount/canUseOfferCode.js";
import { offerCodes } from "../offerCodes.js";
const expect = _expect;

describe("discountUtils", function () {
  describe("get Delivery Cost", function () {
    it("should get delivery cost from passing in base delivery cost, weight of package and distance", function (done) {
      const base_delivery_cost = 90;
      const weight = 5;
      const distance = 10;
      const deliveryCost = getDeliveryCost(
        base_delivery_cost,
        weight,
        distance
      );
      const expectedDeliveryCost =
        base_delivery_cost + weight * 10 + distance * 5;
      expect(deliveryCost).to.deep.equal(expectedDeliveryCost);
      done();
    });
  });
  describe("get Discount Amount", function () {
    it("should get discount amount from passing in offer code, available offer codes and total cost", function (done) {
      const totalCost = 150;
      const offerCode = "OFR003";
      const discount = getDiscountAmount(offerCode, offerCodes, totalCost);
      const expectedDiscount = (5 / 100) * totalCost;
      expect(discount).to.deep.equal(expectedDiscount);
      done();
    });
  });
});

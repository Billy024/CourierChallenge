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
  describe("get Discount and Total Cost", function () {
    it("should get discountedCost object from passing in array of packages, base cost and available offer codes", function (done) {
      const packagesArray = [
        new _package("PKG1", 100, 100, "OFR001"), //should get discount OFR001
        new _package("PKG2", 100, 201, "OFR001"), //exceeding max distance - should not get discount
        new _package("PKG3", 50, 251, "ABCDEF"), //incorrect offercode - should not get discount
      ];
      const base_cost = 90;
      const discountedCostObject = getDiscountAndTotalCost(
        packagesArray,
        base_cost,
        offerCodes
      );
      const deliveryCost1 = getDeliveryCost(
        base_cost,
        packagesArray[0].weight,
        packagesArray[0].distance
      );
      const deliveryCost2 = getDeliveryCost(
        base_cost,
        packagesArray[1].weight,
        packagesArray[1].distance
      );
      const deliveryCost3 = getDeliveryCost(
        base_cost,
        packagesArray[2].weight,
        packagesArray[2].distance
      );
      let expectedDiscountedCostObject = [];

      expectedDiscountedCostObject.push(
        new discountedCost(
          packagesArray[0].id,
          (10 / 100) * deliveryCost1,
          deliveryCost1 - (10 / 100) * deliveryCost1
        )
      );
      expectedDiscountedCostObject.push(
        new discountedCost(packagesArray[1].id, 0, deliveryCost2)
      );
      expectedDiscountedCostObject.push(
        new discountedCost(packagesArray[2].id, 0, deliveryCost3)
      );
      expect(discountedCostObject).to.deep.equal(expectedDiscountedCostObject);
      done();
    });
  });
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

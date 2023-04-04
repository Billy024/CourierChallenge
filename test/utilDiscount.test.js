import { expect as _expect } from "chai";
import { discountedCost } from "../models/discountedCost";
import { _package } from "../models/package";
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
  describe("check if can use Offer Code", function () {
    it("should get false based on offer Code OFR001 parameters", function (done) {
      const weight1 = 10;
      const distance1 = 10;
      const offerCode1 = "OFR001";
      const validity1 = canUseOfferCode(
        weight1,
        distance1,
        offerCode1,
        offerCodes
      );
      const expectedValidity1 = false;
      expect(validity1).to.equal(expectedValidity1);
      done();
    });
    it("should get true based on offer Code OFR002 parameters", function (done) {
      const weight2 = 150;
      const distance2 = 100;
      const offerCode2 = "OFR002";
      const validity2 = canUseOfferCode(
        weight2,
        distance2,
        offerCode2,
        offerCodes
      );
      const expectedValidity2 = true;
      expect(validity2).to.equal(expectedValidity2);
      done();
    });
    it("should get true based on offer Code OFR003 parameters", function (done) {
      const weight3 = 20;
      const distance3 = 100;
      const offerCode3 = "OFR003";
      const validity3 = canUseOfferCode(
        weight3,
        distance3,
        offerCode3,
        offerCodes
      );
      const expectedValidity3 = true;
      expect(validity3).to.equal(expectedValidity3);
      done();
    });
  });
});

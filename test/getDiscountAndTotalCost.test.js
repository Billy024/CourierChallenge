import { expect as _expect } from "chai";
import { _package } from "../models/package.js";
import { offerCodes } from "../offerCodes.js";
import { getDeliveryCost } from "../services/discount/utilDiscount.js";
import { discountedCost } from "../models/discountedCost.js";
import { getDiscountAndTotalCost } from "../services/discount/getDiscountAndTotalCost.js";

const expect = _expect;

describe("getDiscountAndTotalCost", function () {
  it("get Discount And Total Cost for each package", function () {
    const packagesArray = [
      new _package("PKG1", 100, 100, "OFR001"), //should get discount OFR001
      new _package("PKG2", 100, 201, "OFR001"), //exceeding max distance - should not get discount
      new _package("PKG3", 50, 251, "ABCDEF"), //incorrect offercode - should not get discount
    ];
    const baseCost = 90;
    const deliveryCost1 = getDeliveryCost(
      baseCost,
      packagesArray[0].weight,
      packagesArray[0].distance
    );
    const deliveryCost2 = getDeliveryCost(
      baseCost,
      packagesArray[1].weight,
      packagesArray[1].distance
    );
    const deliveryCost3 = getDeliveryCost(
      baseCost,
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
    const result = getDiscountAndTotalCost(packagesArray, baseCost, offerCodes);
    expect(result).to.deep.equal(expectedDiscountedCostObject);
  });
});

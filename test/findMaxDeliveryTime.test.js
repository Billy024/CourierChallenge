import { expect as _expect } from "chai";
import { getDeliveryDetail } from "../services/delivery/getDeliveryDetail.js";
import { packagesWithDeliveryTime } from "../models/packagesWithDeliveryTime.js";
import { findMaxDeliveryTime } from "../services/deliverySorting/findMaxDeliveryTime.js";

const expect = _expect;

describe("findMaxDeliveryTime", function () {
  describe("find Max Delivery Time for vehicle", function () {
    it("should get maximum delivery time from packages", async function () {
      const maxTime = 0.9;
      const packages = [
        new packagesWithDeliveryTime("PKG1", 20, 20, "OFR001", 0.8, 1),
        new packagesWithDeliveryTime("PKG2", 18, 10, "OFR001", maxTime, 1),
        new packagesWithDeliveryTime("PKG3", 5, 5, "OFR001", 0.4, 1),
      ];
      const expectedMaximumDeliveryTime = maxTime * 2;
      const result = findMaxDeliveryTime(packages);
      expect(result).to.deep.equal(expectedMaximumDeliveryTime);
    });
  });
});

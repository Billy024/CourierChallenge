import { expect as _expect } from "chai";
import { packagesWithDeliveryTime } from "../models/packagesWithDeliveryTime.js";
import { findMaxDeliveryTime } from "../services/deliverySorting/findMaxDeliveryTime.js";
import { _package } from "../models/package.js";
import { filterOverweightPackages } from "../services/packages/utilPackage.js";

const expect = _expect;
describe("utilsPackage", function () {
  describe("filterOverweightPackages", function () {
    it("should filter overweight packages > max carriable weight", function () {
      const maxCarriableWeight = 200;
      const packagesArray = [
        new _package("PKG1", 201, 20, "OFR001"),
        new _package("PKG2", 200, 10, "OFR001"),
        new _package("PKG3", 5, 5, "OFR001"),
      ];
      const expectedPackages = [
        new _package("PKG2", 200, 10, "OFR001"),
        new _package("PKG3", 5, 5, "OFR001"),
      ];
      const result = filterOverweightPackages(
        packagesArray,
        maxCarriableWeight
      );
      expect(result).to.deep.equal(expectedPackages);
    });
  });
});

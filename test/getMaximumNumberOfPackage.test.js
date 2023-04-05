import { expect as _expect } from "chai";
import { _package } from "../models/package.js";
import { getMaximumNumberOfPackages } from "../services/deliverySorting/getMaximumNumberOfPackages.js";

const expect = _expect;

describe("getMaximumNumberOfPackages", function () {
  it("should get maximum number of packages for single vehicle", function () {
    const maxCarriableWeight = 200;
    const packages = [
      new _package("PKG1", 30, 20, "OFR001"),
      new _package("PKG2", 60, 10, "OFR002"),
      new _package("PKG3", 50, 5, "OFR003"),
      new _package("PKG4", 40, 5, "OFR001"),
      new _package("PKG5", 35, 5, "OFR002"),
    ];
    const expectedResult = 4;
    const result = getMaximumNumberOfPackages(maxCarriableWeight, packages);
    expect(result).to.deep.equal(expectedResult);
  });
});

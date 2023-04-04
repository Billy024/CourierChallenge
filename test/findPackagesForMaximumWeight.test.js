import { expect as _expect } from "chai";
import { _package } from "../models/package.js";
import { findPackagesForMaximumWeight } from "../services/packages/findPackagesForMaximumWeight.js";
import { getMaximumNumberOfPackages } from "../services/packages/getMaximumNumberOfPackages.js";
import { sortPackagesByWeightAndDistance } from "../services/packages/utilPackage.js";

const expect = _expect;

describe("findPackagesForMaximumWeight", function () {
  it("should get packages of maximum weight < max carriable weight", function () {
    const maxCarriableWeight = 200;
    const remainingPackagesArray = [
      new _package("PKG1", 30, 20, "OFR001"),
      new _package("PKG2", 60, 10, "OFR002"),
      new _package("PKG3", 50, 5, "OFR003"),
      new _package("PKG4", 40, 5, "OFR001"),
      new _package("PKG5", 35, 5, "OFR002"),
    ];
    const maximumNoOfPackages = getMaximumNumberOfPackages(
      maxCarriableWeight,
      remainingPackagesArray
    );
    let descendingPackageArray = sortPackagesByWeightAndDistance(
      remainingPackagesArray
    );
    let maximisedPackages = [];
    const result = findPackagesForMaximumWeight(
      descendingPackageArray,
      maximumNoOfPackages,
      maxCarriableWeight,
      maximisedPackages,
      0,
      0,
      0
    );
    const maximisedPackagesArray = [
      new _package("PKG2", 60, 10, "OFR002"),
      new _package("PKG3", 50, 5, "OFR003"),
      new _package("PKG4", 40, 5, "OFR001"),
      new _package("PKG5", 35, 5, "OFR002"),
    ];
    expect(result.maximised_packages).to.deep.equal(maximisedPackagesArray);
  });
});

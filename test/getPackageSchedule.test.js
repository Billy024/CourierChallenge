import { expect as _expect } from "chai";
import { _package } from "../models/package.js";
import { vehicle } from "../models/vehicle.js";
import { getPackageSchedule } from "../services/packages/getPackageSchedule.js";

const expect = _expect;

describe("getPackageSchedule", function () {
  it("should get get packages with maximum weight < max carriable weight", function () {
    const maxCarriableWeight = 200;
    const maxSpeed = 100;
    const packages = [
      new _package("PKG1", 30, 20, "OFR001"),
      new _package("PKG2", 60, 10, "OFR002"),
      new _package("PKG3", 50, 5, "OFR003"),
      new _package("PKG4", 40, 5, "OFR001"),
      new _package("PKG5", 35, 5, "OFR002"),
    ];
    const currentVehicle = new vehicle(maxSpeed, maxCarriableWeight, 1);
    const sum_of_packages = 4;
    const maximised_packages = [
      new _package("PKG2", 60, 10, "OFR002"),
      new _package("PKG3", 50, 5, "OFR003"),
      new _package("PKG4", 40, 5, "OFR001"),
      new _package("PKG5", 35, 5, "OFR002"),
    ];
    const expectedResult = { sum_of_packages, maximised_packages };
    const result = getPackageSchedule(currentVehicle, packages);
    expect(result).to.deep.equal(expectedResult);
  });
});

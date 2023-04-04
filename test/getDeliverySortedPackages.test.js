import { expect as _expect } from "chai";
import { vehicle } from "../models/vehicle.js";
import { _package } from "../models/package.js";
import { getDeliverySortedPackages } from "../services/deliverySorting/getDeliverySortedPackages.js";
import { packagesWithDeliveryTime } from "../models/packagesWithDeliveryTime.js";

const expect = _expect;

describe("getDeliverySortedPackages", function () {
  it("should get delivery sorted packages with delivery time", function () {
    const maxCarriableWeight = 200;
    const maxSpeed = 70;
    const vehicles = [new vehicle(maxSpeed, maxCarriableWeight, 1)];
    const packagesArray = [
      new _package("PKG1", 30, 20, "OFR001"),
      new _package("PKG2", 60, 10, "OFR002"),
      new _package("PKG3", 50, 5, "OFR003"),
      new _package("PKG4", 40, 5, "OFR001"),
      new _package("PKG5", 35, 5, "OFR002"),
    ];
    const firstMaxTripTime = (Math.floor((10 / maxSpeed) * 100) * 2) / 100;
    const secondTripTime =
      Math.floor((20 / maxSpeed + firstMaxTripTime) * 100) / 100;
    const expectedDeliverySortedPackages = [
      new packagesWithDeliveryTime(
        "PKG2",
        60,
        10,
        "OFR002",
        Math.floor((10 / maxSpeed) * 100) / 100,
        1
      ),
      new packagesWithDeliveryTime(
        "PKG3",
        50,
        5,
        "OFR003",
        Math.floor((5 / maxSpeed) * 100) / 100,
        1
      ),
      new packagesWithDeliveryTime(
        "PKG4",
        40,
        5,
        "OFR001",
        Math.floor((5 / maxSpeed) * 100) / 100,
        1
      ),
      new packagesWithDeliveryTime(
        "PKG5",
        35,
        5,
        "OFR002",
        Math.floor((5 / maxSpeed) * 100) / 100,
        1
      ),
      new packagesWithDeliveryTime("PKG1", 30, 20, "OFR001", secondTripTime, 1),
    ];
    const result = getDeliverySortedPackages(vehicles, packagesArray);
    expect(result).to.deep.equal(expectedDeliverySortedPackages);
  });
});

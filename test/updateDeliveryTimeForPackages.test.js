import { expect as _expect } from "chai";
import { _package } from "../models/package.js";
import { getPackageDetail } from "../services/packages/getPackageDetail.js";
import { updateDeliveryTimeForPackages } from "../services/packages/updateDeliveryTimeForPackages.js";
import { vehicleWithDeliveryTime } from "../models/vehicleWithDeliveryTime.js";
import { packagesWithDeliveryTime } from "../models/packagesWithDeliveryTime.js";

const expect = _expect;

describe("getPackageData", function () {
  it("should get get packages from user input", function () {
    const maxCarriableWeight = 200;
    const maxSpeed = 100;
    const availableAfterTime = 1.2;
    const vehicleId = 1;
    const currentVehicle = new vehicleWithDeliveryTime(
      maxSpeed,
      maxCarriableWeight,
      vehicleId,
      availableAfterTime
    );
    const packages = [
      new _package("PKG1", 30, 20, "OFR001"),
      new _package("PKG2", 60, 10, "OFR002"),
      new _package("PKG3", 50, 5, "OFR003"),
      new _package("PKG4", 40, 5, "OFR001"),
      new _package("PKG5", 35, 5, "OFR002"),
    ];

    const deliveryTime1 =
      Math.floor((availableAfterTime + 20 / maxSpeed) * 100) / 100;
    const deliveryTime2 =
      Math.floor((availableAfterTime + 10 / maxSpeed) * 100) / 100;
    const deliveryTime3 =
      Math.floor((availableAfterTime + 5 / maxSpeed) * 100) / 100;
    const deliveryTime4 =
      Math.floor((availableAfterTime + 5 / maxSpeed) * 100) / 100;
    const deliveryTime5 =
      Math.floor((availableAfterTime + 5 / maxSpeed) * 100) / 100;

    const expectedPackages = [
      new packagesWithDeliveryTime(
        "PKG1",
        30,
        20,
        "OFR001",
        deliveryTime1,
        vehicleId
      ),
      new packagesWithDeliveryTime(
        "PKG2",
        60,
        10,
        "OFR002",
        deliveryTime2,
        vehicleId
      ),
      new packagesWithDeliveryTime(
        "PKG3",
        50,
        5,
        "OFR003",
        deliveryTime3,
        vehicleId
      ),
      new packagesWithDeliveryTime(
        "PKG4",
        40,
        5,
        "OFR001",
        deliveryTime4,
        vehicleId
      ),
      new packagesWithDeliveryTime(
        "PKG5",
        35,
        5,
        "OFR002",
        deliveryTime5,
        vehicleId
      ),
    ];

    const result = updateDeliveryTimeForPackages(packages, currentVehicle);
    expect(result).to.deep.equal(expectedPackages);
  });
});

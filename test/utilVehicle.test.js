import { expect as _expect } from "chai";
import { vehicle } from "../models/vehicle.js";
import { vehicleWithDeliveryTime } from "../models/vehicleWithDeliveryTime.js";
import {
  initializeVehicleswithAvailabilityTime,
  sortVehiclesByAvailableAfterTime,
} from "../services/vehicles/utilVehicle.js";
const expect = _expect;

describe("utilVehicls", function () {
  describe("initializeVehicleswithAvailabilityTime", function () {
    it("should return array of vehicles updated with available after time", function (done) {
      const maxSpeed = 100;
      const maxCarriableWeight = 200;

      const currentVehicleArray = [
        new vehicle(maxSpeed, maxCarriableWeight, 1),
        new vehicle(maxSpeed, maxCarriableWeight, 2),
      ];
      const vehicleArray =
        initializeVehicleswithAvailabilityTime(currentVehicleArray);
      const expectedVehicleArray = [
        new vehicleWithDeliveryTime(maxSpeed, maxCarriableWeight, 1, 0),
        new vehicleWithDeliveryTime(maxSpeed, maxCarriableWeight, 2, 0),
      ];

      expect(vehicleArray).to.deep.equal(expectedVehicleArray);
      done();
    });
  });
  describe("sortVehiclesByAvailableAfterTime", function () {
    it("should return array of vehicles sorted by available after time", function (done) {
      const maxSpeed = 100;
      const maxCarriableWeight = 200;

      const currentVehicleArray = [
        new vehicleWithDeliveryTime(maxSpeed, maxCarriableWeight, 1, 0.8),
        new vehicleWithDeliveryTime(maxSpeed, maxCarriableWeight, 2, 1),
        new vehicleWithDeliveryTime(maxSpeed, maxCarriableWeight, 2, 0.5),
      ];
      const vehicleArray =
        sortVehiclesByAvailableAfterTime(currentVehicleArray);
      const expectedVehicleArray = [
        new vehicleWithDeliveryTime(maxSpeed, maxCarriableWeight, 2, 0.5),
        new vehicleWithDeliveryTime(maxSpeed, maxCarriableWeight, 1, 0.8),
        new vehicleWithDeliveryTime(maxSpeed, maxCarriableWeight, 2, 1),
      ];

      expect(vehicleArray).to.deep.equal(expectedVehicleArray);
      done();
    });
  });
});

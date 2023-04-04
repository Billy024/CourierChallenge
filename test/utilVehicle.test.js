import { expect as _expect } from "chai";
import { vehicle } from "../models/vehicle.js";
import { getVehicleDetail } from "../services/vehicles/getVehicleDetail.js";
const expect = _expect;

describe("vehicleUtils", function () {
  describe("get Vehicle Detail", function () {
    it("should get vehicle object from array of string", function (done) {
      const no_of_vehicles = 3;
      const max_speed = 100;
      const max_carriable_weight = 200;

      const arrayOfString = [
        `${no_of_vehicles}`,
        `${max_speed}`,
        `${max_carriable_weight}`,
      ];
      const vehicleArray = getVehicleDetail(arrayOfString);
      let expectedVehicleArray = [];

      for (let _vehicle = 0; _vehicle < no_of_vehicles; _vehicle++) {
        expectedVehicleArray.push(
          new vehicle(max_speed, max_carriable_weight, _vehicle + 1)
        );
      }

      expect(vehicleArray).to.deep.equal(expectedVehicleArray);
      done();
    });
  });
});

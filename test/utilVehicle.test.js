import { expect as _expect } from "chai";
import { vehicle } from "../model.js";
import { getVehicleDetail } from "../util/utilVehicle.js";
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
      const vehicleObject = getVehicleDetail(arrayOfString);
      const expectedVehicleObject = new vehicle(
        no_of_vehicles,
        max_speed,
        max_carriable_weight
      );
      expect(vehicleObject).to.deep.equal(expectedVehicleObject);
      done();
    });
  });
});

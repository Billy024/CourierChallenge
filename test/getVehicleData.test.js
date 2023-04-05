import { expect as _expect } from "chai";
import { VEHICLE_QUESTION } from "../constants.js";
import { getVehicleDetail } from "../services/vehicles/getVehicleDetail.js";
import { getVehicleData } from "../services/vehicles/getVehicleData.js";

const expect = _expect;

describe("getVehicleData", function () {
  it("should get vehicle array from mocked user input", async function () {
    const vehicleQuestion = VEHICLE_QUESTION;
    const inputQuantity = 3;
    const promptAnswer1 = "2";
    const promptAnswer2 = "100";
    const promptAnswer3 = "200";
    const promptAnswer = `${promptAnswer1} ${promptAnswer2} ${promptAnswer3}`;
    async function promptFn() {
      return [promptAnswer];
    }

    const result = await getVehicleData(
      vehicleQuestion,
      inputQuantity,
      promptFn
    );
    expect(result).to.deep.equal(
      getVehicleDetail([promptAnswer1, promptAnswer2, promptAnswer3])
    );
  });
});

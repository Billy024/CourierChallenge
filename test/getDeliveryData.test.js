import { expect as _expect } from "chai";
import { DELIVERY_QUESTION } from "../constants.js";
import { getDeliveryDetail } from "../services/delivery/getDeliveryDetail.js";
import { getDeliveryData } from "../services/delivery/getDeliveryData.js";
import sinon from "sinon";

const expect = _expect;

describe("getDeliveryData", function () {
  describe("get Delivery Data", function () {
    it("should get delivery object from array of string", async function () {
      const deliveryQuestion = DELIVERY_QUESTION;
      const inputQuantity = 2;
      const promptAnswer1 = "90";
      const promptAnswer2 = "5";
      const promptAnswer = `${promptAnswer1} ${promptAnswer2}`;
      async function promptFn() {
        return [promptAnswer];
      }
      const result = await getDeliveryData(
        deliveryQuestion,
        inputQuantity,
        promptFn
      );
      expect(result).to.deep.equal(
        getDeliveryDetail([promptAnswer1, promptAnswer2])
      );
    });
  });
});

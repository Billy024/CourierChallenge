import { expect as _expect } from "chai";
import { getDeliveryDetail } from "../services/delivery/getDeliveryDetail.js";
import { delivery } from "../models/delivery.js";
const expect = _expect;

describe("getDeliveryDetail", function () {
  describe("get Delivery Detail", function () {
    it("should get delivery object from array of string", function (done) {
      const value1 = 90;
      const value2 = 2;
      const arrayOfString = [`${value1}`, `${value2}`];
      const deliveryObject = getDeliveryDetail(arrayOfString);
      const expectedDeliveryObject = new delivery(value1, value2);
      expect(deliveryObject).to.deep.equal(expectedDeliveryObject);
      done();
    });
  });
});

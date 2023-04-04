import { expect as _expect } from "chai";
import { splitStringtoArray } from "../services/terminal/utilTerminal.js";
const expect = _expect;

describe("sharedUtils", function () {
  describe("split String to Array", function () {
    it("should split string and return an array of value", function (done) {
      const value1 = 90;
      const value2 = 2;
      const promptAnswer = { OVERALL_DELIVERY_DETAIL: `${value1} ${value2}` };
      const valueArray = splitStringtoArray(promptAnswer, 2);
      const expectedValueArray = [`${value1}`, `${value2}`];
      expect(valueArray).to.deep.equal(expectedValueArray);
      done();
    });
  });
});

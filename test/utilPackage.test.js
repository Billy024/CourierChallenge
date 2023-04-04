import { expect as _expect } from "chai";
import { _package } from "../models/package.js";
import { getPackageDetail } from "../services/packages/getPackageDetail.js";
const expect = _expect;

describe("packageUtils", function () {
  describe("get Package Detail", function () {
    it("should get package object from array of string", function (done) {
      const value1 = "Id1";
      const value2 = 5;
      const value3 = 5;
      const value4 = "OFR001";
      const arrayOfString = [value1, `${value2}`, `${value3}`, value4];
      const packageObject = getPackageDetail(arrayOfString);
      const expectedPackageObject = new _package(
        value1,
        value2,
        value3,
        value4
      );
      expect(packageObject).to.deep.equal(expectedPackageObject);
      done();
    });
  });
});

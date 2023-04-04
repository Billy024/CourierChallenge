import { expect as _expect } from "chai";
import { offerCodes } from "../offerCodes.js";
import { canUseOfferCode } from "../services/discount/canUseOfferCode.js";
const expect = _expect;

describe("check if can use Offer Code", function () {
  it("should get false based on offer Code OFR001 parameters", function (done) {
    const weight1 = 10;
    const distance1 = 10;
    const offerCode1 = "OFR001";
    const validity1 = canUseOfferCode(
      weight1,
      distance1,
      offerCode1,
      offerCodes
    );
    const expectedValidity1 = false;
    expect(validity1).to.equal(expectedValidity1);
    done();
  });
  it("should get true based on offer Code OFR002 parameters", function (done) {
    const weight2 = 150;
    const distance2 = 100;
    const offerCode2 = "OFR002";
    const validity2 = canUseOfferCode(
      weight2,
      distance2,
      offerCode2,
      offerCodes
    );
    const expectedValidity2 = true;
    expect(validity2).to.equal(expectedValidity2);
    done();
  });
  it("should get true based on offer Code OFR003 parameters", function (done) {
    const weight3 = 20;
    const distance3 = 100;
    const offerCode3 = "OFR003";
    const validity3 = canUseOfferCode(
      weight3,
      distance3,
      offerCode3,
      offerCodes
    );
    const expectedValidity3 = true;
    expect(validity3).to.equal(expectedValidity3);
    done();
  });
  it("should get false based on offer Code AAA001 parameters", function (done) {
    const weight3 = 20;
    const distance3 = 100;
    const offerCode3 = "AAA001";
    const validity3 = canUseOfferCode(
      weight3,
      distance3,
      offerCode3,
      offerCodes
    );
    const expectedValidity3 = false;
    expect(validity3).to.equal(expectedValidity3);
    done();
  });
});

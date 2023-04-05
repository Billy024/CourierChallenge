import { expect as _expect } from "chai";
import { _package } from "../models/package.js";
import { getPackagesData } from "../services/packages/getPackagesData.js";
import { PACKAGE_QUESTION } from "../constants.js";
import { getPackageDetail } from "../services/packages/getPackageDetail.js";

const expect = _expect;

describe("getPackagesData", function () {
  it("should get packages from user input", async function () {
    const numberOfPackages = 1;
    const packageQuestion = PACKAGE_QUESTION;
    const inputQuantity = 4;
    const promptAnswer1 = "PKG1";
    const promptAnswer2 = "40";
    const promptAnswer3 = "60";
    const promptAnswer4 = "OFR001";

    const promptAnswer = `${promptAnswer1} ${promptAnswer2} ${promptAnswer3} ${promptAnswer4}`;
    async function promptFn() {
      return [promptAnswer];
    }

    const result = await getPackagesData(
      numberOfPackages,
      packageQuestion,
      inputQuantity,
      promptFn
    );
    const packageDetail = getPackageDetail([
      promptAnswer1,
      promptAnswer2,
      promptAnswer3,
      promptAnswer4,
    ]);
    expect(result).to.deep.equal({
      packageData: [packageDetail],
      validPackageInput: true,
    });
  });
});

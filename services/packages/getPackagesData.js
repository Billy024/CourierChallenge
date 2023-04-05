import { splitStringtoArray } from "../terminal/utilTerminal.js";
import { getPackageDetail } from "../packages/getPackageDetail.js";
import { promptQuestion } from "../terminal/promptQuestion.js";

export async function getPackagesData(
  no_of_packages,
  package_question,
  input_quantity,
  promptFn = promptQuestion
) {
  let validInput = true;
  let packagesDetail = [];
  for (let i = 0; i < no_of_packages; i++) {
    const packageAnswer = await promptFn(package_question);
    const packageArray = splitStringtoArray(packageAnswer, input_quantity);
    if (packageArray.length != input_quantity) {
      validInput = false;
    }
    const packageDetail = getPackageDetail(packageArray);
    packagesDetail.push(packageDetail);
  }
  return { packageData: packagesDetail, validPackageInput: validInput };
}

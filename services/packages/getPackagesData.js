import { promptQuestion } from "../Terminal/promptQuestion.js";
import { splitStringtoArray } from "../Terminal/utilTerminal.js";
import { getPackageDetail } from "./getPackageDetail.js";

export async function getPackagesData(
  no_of_packages,
  package_question,
  input_quantity
) {
  let packagesData = [];
  for (let i = 0; i < no_of_packages; i++) {
    const packageAnswer = await promptQuestion(package_question);
    const packageArray = splitStringtoArray(packageAnswer, input_quantity);
    const packageData = getPackageDetail(packageArray);
    packagesData.push(packageData);
  }
  return packagesData;
}
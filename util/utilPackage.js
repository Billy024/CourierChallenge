import { _package } from "../model.js";
import { promptQuestion, splitStringtoArray } from "./utilShared.js";

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

export function getPackageDetail(package_array_string) {
  const id = package_array_string[0];
  const weight = parseInt(package_array_string[1]);
  const distance = parseInt(package_array_string[2]);
  const offer_code = package_array_string[3];
  return new _package(id, weight, distance, offer_code);
}

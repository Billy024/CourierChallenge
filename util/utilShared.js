import inquirer from "inquirer";
import { _discountedCost, _package } from "../model.js";

export async function promptQuestion(question) {
  return await inquirer
    .prompt(question)
    .then((answer) => {
      return Object.values(answer);
    })
    .catch((err) => {
      console.error(`ERROR: ${err}`);
    });
}

export function splitStringtoArray(prompt_answer, input_quantity) {
  return Object.values(prompt_answer)[0].trim().split(" ", input_quantity);
}

export function outputDiscountAndTotalCost(
  discountAndTotalCost,
  deliverySortedPackages
) {
  discountAndTotalCost.map((eachPackage) => {
    let thisDeliverySortedPackage = getDeliverySortedPackage(
      deliverySortedPackages,
      eachPackage.package_id
    );
    let finalString =
      Object.values(eachPackage).reduce((outputString, outputItem) => {
        return (outputString += `${outputItem} `);
      }, "") + `${thisDeliverySortedPackage?.delivery_time}`;
    console.log(finalString.trim());
  });
}

export function getDeliverySortedPackage(deliverySortedPackages, package_id) {
  return deliverySortedPackages.filter(
    (deliverySortedPackage) => deliverySortedPackage.id == package_id
  )[0];
}

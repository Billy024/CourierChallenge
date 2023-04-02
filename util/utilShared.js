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

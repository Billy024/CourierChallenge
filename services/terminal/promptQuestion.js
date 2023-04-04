import inquirer from "inquirer";

export async function promptQuestion(question) {
  return await inquirer
    .prompt(question)
    .then((answer) => {
      return Object.values(answer);
    })
    .catch((err) => {
      console.error(
        `ERROR in prompting for Question: ${question}, ERROR: ${err}`
      );
    });
}

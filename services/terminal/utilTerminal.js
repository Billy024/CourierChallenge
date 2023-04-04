export function splitStringtoArray(prompt_answer, input_quantity) {
  return Object.values(prompt_answer)[0].trim().split(" ", input_quantity);
}

export function getDeliverySortedPackageWithPackageId(
  deliverySortedPackages,
  package_id
) {
  return deliverySortedPackages.filter(
    (deliverySortedPackage) => deliverySortedPackage.id == package_id
  )[0];
}

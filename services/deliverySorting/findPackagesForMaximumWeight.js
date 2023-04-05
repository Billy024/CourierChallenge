export function findPackagesForMaximumWeight(
  descendingPackageArray,
  maximumNoOfPackages,
  max_carriable_weight,
  maximised_packages,
  sum_of_weight,
  index,
  sum_of_packages
) {
  for (let p = index; p < descendingPackageArray.length; p++) {
    if (sum_of_packages == maximumNoOfPackages) {
      continue;
    }
    let new_weight_sum = sum_of_weight + descendingPackageArray[p].weight;
    if (new_weight_sum <= max_carriable_weight) {
      let new_sum_of_packages = sum_of_packages + 1;
      let new_maximised_packages = [
        ...maximised_packages,
        descendingPackageArray[p],
      ];
      const packageObject = findPackagesForMaximumWeight(
        descendingPackageArray,
        maximumNoOfPackages,
        max_carriable_weight,
        new_maximised_packages,
        new_weight_sum,
        p + 1,
        new_sum_of_packages
      );
      if (packageObject.sum_of_packages == maximumNoOfPackages) {
        sum_of_packages = maximumNoOfPackages;
        maximised_packages = [...packageObject.maximised_packages];
      }
    }
  }
  return { sum_of_packages, maximised_packages };
}

export function getMaximumNumberOfPackages(
  max_carriable_weight,
  packagesArray
) {
  packagesArray.sort((a, b) => {
    return a.weight - b.weight;
  });
  let maximumNumberOfPackages = packagesArray.reduce(
    (sum, _package) => {
      if (sum.weight + _package.weight <= max_carriable_weight) {
        sum.weight += _package.weight;
        sum.count++;
      }
      return sum;
    },
    { weight: 0, count: 0 }
  ).count;
  return maximumNumberOfPackages;
}

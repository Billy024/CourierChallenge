export function filterOverweightPackages(packagesArray, maxCarriableWeight) {
  return packagesArray.filter((_package) => {
    if (_package.weight > maxCarriableWeight) {
      console.warn(
        `Package id: ${_package.id} is overweight and cannot be delivered`
      );
    }
    return _package.weight <= maxCarriableWeight;
  });
}

export function sortPackagesByWeightAndDistance(packagesArray) {
  return packagesArray.sort((a, b) => {
    if (a.weight !== b.weight) {
      return b.weight - a.weight;
    } else {
      return a.distance - b.distance;
    }
  });
}

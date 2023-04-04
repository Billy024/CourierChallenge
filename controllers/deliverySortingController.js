import { findMaxDeliveryTime } from "../services/deliverySorting/findMaxDeliveryTime.js";
import { getDeliverySortedPackages } from "../services/deliverySorting/getDeliverySortedPackages.js";

export class deliverySortingController {
  _findMaxDeliveryTime(packages) {
    return findMaxDeliveryTime(packages);
  }

  _getDeliverySortedPackages(vehicles, packagesArray) {
    return getDeliverySortedPackages(vehicles, packagesArray);
  }

  _findPackagesForMaximumWeight(
    descendingPackageArray,
    maximumNoOfPackages,
    max_carriable_weight,
    maximised_packages,
    sum_of_weight,
    index,
    sum_of_packages
  ) {
    return findPackagesForMaximumWeight(
      descendingPackageArray,
      maximumNoOfPackages,
      max_carriable_weight,
      maximised_packages,
      sum_of_weight,
      index,
      sum_of_packages
    );
  }
}

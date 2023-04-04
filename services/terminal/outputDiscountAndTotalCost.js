export function outputDiscountAndTotalCost(
  discountAndTotalCost,
  deliverySortedPackages
) {
  discountAndTotalCost.map((eachPackage) => {
    let thisDeliverySortedPackage = getDeliverySortedPackageWithPackageId(
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

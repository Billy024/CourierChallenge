export function outputDiscountAndTotalCost(
  discountAndTotalCost,
  deliverySortedPackages
) {
  discountAndTotalCost.map((eachPackage) => {
    let thisDeliverySortedPackage = deliverySortedPackages.filter(
      (deliverySortedPackage) =>
        deliverySortedPackage.id == eachPackage.package_id
    )[0];
    let finalString =
      Object.values(eachPackage).reduce((outputString, outputItem) => {
        return (outputString += `${outputItem} `);
      }, "") + `${thisDeliverySortedPackage?.delivery_time}`;
    console.log(finalString.trim());
  });
}

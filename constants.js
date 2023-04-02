export const INPUT = "input";
export const DETAIL_INPUT_QUANTITY = 2;
export const PACKAGE_INPUT_QUANTITY = 4;
export const OVERALL_DELIVERY_DETAIL = "OVERALL_DELIVERY_DETAIL";
export const EACH_PACKAGE_DETAIL = "EACH_PACKAGE_DETAIL";
export const OVERALL_DELIVERY_DETAIL_QUESTION = "Delivery Cost & Quantity ";
export const EACH_PACKAGE_DETAIL_QUESTION = "Package Details & Offercode ";
export const VEHICLE_DETAIL = "VEHICLE_DETAIL";
export const VEHICLE_DETAIL_QUESTION = "Vehicle Details";
export const VEHICLE_INPUT_QUANTITY = 3;

export const DELIVERY_QUESTION = {
  type: INPUT,
  name: OVERALL_DELIVERY_DETAIL,
  message: OVERALL_DELIVERY_DETAIL_QUESTION,
};

export const PACKAGE_QUESTION = {
  type: INPUT,
  name: EACH_PACKAGE_DETAIL,
  message: EACH_PACKAGE_DETAIL_QUESTION,
};

export const VEHICLE_QUESTION = {
  type: INPUT,
  name: VEHICLE_DETAIL,
  message: VEHICLE_DETAIL_QUESTION,
};

import { _package } from "../../models/package";

export function getPackageDetail(package_array_string) {
  const id = package_array_string[0];
  const weight = parseInt(package_array_string[1]);
  const distance = parseInt(package_array_string[2]);
  const offer_code = package_array_string[3];
  return new _package(id, weight, distance, offer_code);
}

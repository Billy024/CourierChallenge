import { _package } from "./package.js";

export class packagesWithDeliveryTime extends _package {
  constructor(id, weight, distance, offer_code, delivery_time, vehicle_id) {
    super(id, weight, distance, offer_code);
    this.delivery_time = delivery_time;
    this.vehicle_id = vehicle_id;
  }
}

import { vehicle } from "./vehicle.js";

export class vehicleWithDeliveryTime extends vehicle {
  constructor(max_speed, max_carriable_weight, id, available_after_time) {
    super(max_speed, max_carriable_weight, id);
    this.available_after_time = available_after_time;
  }
}

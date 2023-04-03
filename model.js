export class delivery {
  constructor(base_delivery_cost, no_of_packages) {
    this.base_delivery_cost = base_delivery_cost;
    this.no_of_packages = no_of_packages;
  }
}
export class _package {
  constructor(id, weight, distance, offer_code) {
    this.id = id;
    this.weight = weight;
    this.distance = distance;
    this.offer_code = offer_code;
  }
}
export class packagesWithDeliveryTime extends _package {
  constructor(id, weight, distance, offer_code, delivery_time, vehicle_id) {
    super(id, weight, distance, offer_code);
    this.delivery_time = delivery_time;
    this.vehicle_id = vehicle_id;
  }
}
export class _discountedCost {
  constructor(package_id, discount, total_cost) {
    this.package_id = package_id;
    this.discount = discount;
    this.total_cost = total_cost;
  }
}
export class vehicle {
  constructor(max_speed, max_carriable_weight, id) {
    this.max_speed = max_speed;
    this.max_carriable_weight = max_carriable_weight;
    this.id = id;
  }
}

export class vehicleWithDeliveryTime extends vehicle {
  constructor(max_speed, max_carriable_weight, id, available_after_time) {
    super(max_speed, max_carriable_weight, id);
    this.available_after_time = available_after_time;
  }
}

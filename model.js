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

export class _discountedCost {
  constructor(id, discount, total_cost) {
    this.id = id;
    this.discount = discount;
    this.total_cost = total_cost;
  }
}

export class vehicle {
  constructor(max_speed, max_carriable_weight) {
    this.max_speed = max_speed;
    this.max_carriable_weight = max_carriable_weight;
  }
}

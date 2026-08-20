import type { Order, OrderReward } from "@/domains/ecommerce/types";

/**
 * Orders can later trigger XP, cards and membership effects.
 * Reward amounts and eligibility are not defined yet.
 */
export interface OrderRewardProcessor {
  process(order: Order): Promise<OrderReward[]>;
}

export class UnconfiguredOrderRewardProcessor implements OrderRewardProcessor {
  async process(_order: Order): Promise<OrderReward[]> {
    return [];
  }
}

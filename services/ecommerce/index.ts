import type { Order, OrderReward } from "@/types/ecommerce";
import { assertServerOnly } from "@/lib/security";

export type OrderRewardHandler = (order: Order) => Promise<OrderReward[]>;

const rewardHandlers: OrderRewardHandler[] = [];

export function registerOrderRewardHandler(handler: OrderRewardHandler): void {
  rewardHandlers.push(handler);
}

/**
 * Paid orders will later grant XP, cards and membership effects.
 * Handlers are registered by those systems when they are built.
 */
export async function onOrderPaid(order: Order): Promise<OrderReward[]> {
  assertServerOnly();
  if (order.status !== "paid") return [];

  const rewards: OrderReward[] = [];
  for (const handler of rewardHandlers) {
    rewards.push(...(await handler(order)));
  }
  return rewards;
}

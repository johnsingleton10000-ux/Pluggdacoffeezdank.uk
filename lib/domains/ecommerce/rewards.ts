import type { Order, OrderReward } from "../../../types/dcbd";

export interface OrderRewardHandler {
  handlePaidOrder(order: Order): Promise<OrderReward[]>;
}

/**
 * Webhooks should call this server-side handler after payment verification.
 * Product-to-XP/card rules are deliberately left undefined for now.
 */
export class UnconfiguredOrderRewardHandler implements OrderRewardHandler {
  async handlePaidOrder(): Promise<OrderReward[]> {
    return [];
  }
}

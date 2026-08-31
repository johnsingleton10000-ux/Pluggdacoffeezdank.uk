/**
 * DCBD University — Layer 1, Stage 1 server models.
 *
 * Mirrors supabase/migrations/20260831080000_stage1_ecommerce_foundation.sql
 * so API routes can share enum values and table shapes with Postgres.
 *
 * TCG collectible stats live on Product. Account progression (xpPoints / level)
 * is reserved on Customer for Layer 2 (FlixFree) and Layer 3 (Forum).
 */

/** @typedef {'PENDING_PAYMENT' | 'PAYMENT_PROCESSING' | 'PAID' | 'PAYMENT_FAILED' | 'PAYMENT_CANCELLED' | 'PAYMENT_EXPIRED' | 'REFUND_PENDING' | 'REFUNDED'} OrderStatus */

/** @typedef {'PENDING' | 'AUTHORIZED' | 'COMPLETED' | 'FAILED' | 'CANCELLED'} PaymentStatus */

/** @typedef {'FLOWER' | 'CONCENTRATE' | 'ELIQUID' | 'VAULT_SPECIAL'} ProductCategory */

/**
 * @typedef {object} WeightOption
 * @property {string} weight e.g. "1G"
 * @property {number} price
 */

/**
 * @typedef {object} Customer
 * @property {string} id
 * @property {string} email
 * @property {string | null} name
 * @property {number} xpPoints Layer 2 / Layer 3 progression hook
 * @property {number} level Layer 2 / Layer 3 progression hook
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} Product
 * @property {string} id
 * @property {string} name
 * @property {string | null} description
 * @property {ProductCategory} category
 * @property {string | null} tierLabel e.g. PATELLA, SUGAR, VIRUS
 * @property {WeightOption[] | null} weightOptions
 * @property {number} priceGbp
 * @property {number | null} starchPercentage TCG starch stat
 * @property {number | null} powerRating TCG power stat
 * @property {string[] | null} flavorNotes
 * @property {string | null} companionCardTitle
 * @property {string | null} companionCardEffect
 * @property {number} inventoryQuantity
 * @property {string} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} Order
 * @property {string} id
 * @property {string} orderNumber
 * @property {string | null} customerId
 * @property {number} subtotal
 * @property {number} discount
 * @property {number} shipping
 * @property {number} total
 * @property {string} currency
 * @property {OrderStatus} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} OrderItem
 * @property {string} id
 * @property {string} orderId
 * @property {string} productId
 * @property {number} quantity
 * @property {number} unitPrice
 * @property {number} totalPrice
 * @property {string | null} selectedWeight
 * @property {string} createdAt
 */

/**
 * @typedef {object} Payment
 * @property {string} id
 * @property {string} orderId
 * @property {string} provider
 * @property {string | null} providerPaymentId
 * @property {number} amount
 * @property {string} currency
 * @property {PaymentStatus} status
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string | null} completedAt
 */

/**
 * @typedef {object} PaymentEvent
 * @property {string} id
 * @property {string} paymentId
 * @property {string | null} providerEventId
 * @property {string} eventType
 * @property {string | null} payloadHash SHA-256 hex of the raw webhook body
 * @property {boolean} processed
 * @property {string} createdAt
 */

export const ORDER_STATUS = Object.freeze({
  PENDING_PAYMENT: "PENDING_PAYMENT",
  PAYMENT_PROCESSING: "PAYMENT_PROCESSING",
  PAID: "PAID",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  PAYMENT_CANCELLED: "PAYMENT_CANCELLED",
  PAYMENT_EXPIRED: "PAYMENT_EXPIRED",
  REFUND_PENDING: "REFUND_PENDING",
  REFUNDED: "REFUNDED",
});

export const PAYMENT_STATUS = Object.freeze({
  PENDING: "PENDING",
  AUTHORIZED: "AUTHORIZED",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
});

export const PRODUCT_CATEGORY = Object.freeze({
  FLOWER: "FLOWER",
  CONCENTRATE: "CONCENTRATE",
  ELIQUID: "ELIQUID",
  VAULT_SPECIAL: "VAULT_SPECIAL",
});

export const DEFAULT_CURRENCY = "GBP";
export const DEFAULT_PAYMENT_PROVIDER = "TRUELAYER";
export const DEFAULT_PRODUCT_STATUS = "ACTIVE";

/**
 * @param {Partial<Customer> & { id: string, email: string, createdAt: string, updatedAt: string }} row
 * @returns {Customer}
 */
export function customerFromRow(row) {
  return {
    id: String(row.id),
    email: String(row.email),
    name: row.name == null ? null : String(row.name),
    xpPoints: Number(row.xpPoints ?? row.xp_points ?? 0),
    level: Number(row.level ?? 1),
    createdAt: String(row.createdAt ?? row.created_at),
    updatedAt: String(row.updatedAt ?? row.updated_at),
  };
}

/**
 * @param {Record<string, unknown>} row
 * @returns {Product}
 */
export function productFromRow(row) {
  return {
    id: /** @type {string} */ (row.id),
    name: /** @type {string} */ (row.name),
    description: row.description == null ? null : String(row.description),
    category: /** @type {ProductCategory} */ (row.category),
    tierLabel: row.tier_label == null && row.tierLabel == null ? null : String(row.tierLabel ?? row.tier_label),
    weightOptions: /** @type {WeightOption[] | null} */ (row.weight_options ?? row.weightOptions ?? null),
    priceGbp: Number(row.price_gbp ?? row.priceGbp),
    starchPercentage:
      row.starch_percentage == null && row.starchPercentage == null
        ? null
        : Number(row.starchPercentage ?? row.starch_percentage),
    powerRating:
      row.power_rating == null && row.powerRating == null
        ? null
        : Number(row.powerRating ?? row.power_rating),
    flavorNotes: /** @type {string[] | null} */ (row.flavor_notes ?? row.flavorNotes ?? null),
    companionCardTitle:
      row.companion_card_title == null && row.companionCardTitle == null
        ? null
        : String(row.companionCardTitle ?? row.companion_card_title),
    companionCardEffect:
      row.companion_card_effect == null && row.companionCardEffect == null
        ? null
        : String(row.companionCardEffect ?? row.companion_card_effect),
    inventoryQuantity: Number(row.inventory_quantity ?? row.inventoryQuantity ?? 0),
    status: String(row.status ?? DEFAULT_PRODUCT_STATUS),
    createdAt: String(row.created_at ?? row.createdAt),
    updatedAt: String(row.updated_at ?? row.updatedAt),
  };
}

/**
 * @param {Record<string, unknown>} row
 * @returns {Order}
 */
export function orderFromRow(row) {
  return {
    id: /** @type {string} */ (row.id),
    orderNumber: String(row.order_number ?? row.orderNumber),
    customerId:
      row.customer_id == null && row.customerId == null
        ? null
        : String(row.customerId ?? row.customer_id),
    subtotal: Number(row.subtotal),
    discount: Number(row.discount ?? 0),
    shipping: Number(row.shipping ?? 0),
    total: Number(row.total),
    currency: String(row.currency ?? DEFAULT_CURRENCY),
    status: /** @type {OrderStatus} */ (row.status ?? ORDER_STATUS.PENDING_PAYMENT),
    createdAt: String(row.created_at ?? row.createdAt),
    updatedAt: String(row.updated_at ?? row.updatedAt),
  };
}

/**
 * @param {Record<string, unknown>} row
 * @returns {OrderItem}
 */
export function orderItemFromRow(row) {
  return {
    id: /** @type {string} */ (row.id),
    orderId: String(row.order_id ?? row.orderId),
    productId: String(row.product_id ?? row.productId),
    quantity: Number(row.quantity),
    unitPrice: Number(row.unit_price ?? row.unitPrice),
    totalPrice: Number(row.total_price ?? row.totalPrice),
    selectedWeight:
      row.selected_weight == null && row.selectedWeight == null
        ? null
        : String(row.selectedWeight ?? row.selected_weight),
    createdAt: String(row.created_at ?? row.createdAt),
  };
}

/**
 * @param {Record<string, unknown>} row
 * @returns {Payment}
 */
export function paymentFromRow(row) {
  return {
    id: /** @type {string} */ (row.id),
    orderId: String(row.order_id ?? row.orderId),
    provider: String(row.provider ?? DEFAULT_PAYMENT_PROVIDER),
    providerPaymentId:
      row.provider_payment_id == null && row.providerPaymentId == null
        ? null
        : String(row.providerPaymentId ?? row.provider_payment_id),
    amount: Number(row.amount),
    currency: String(row.currency ?? DEFAULT_CURRENCY),
    status: /** @type {PaymentStatus} */ (row.status ?? PAYMENT_STATUS.PENDING),
    createdAt: String(row.created_at ?? row.createdAt),
    updatedAt: String(row.updated_at ?? row.updatedAt),
    completedAt:
      row.completed_at == null && row.completedAt == null
        ? null
        : String(row.completedAt ?? row.completed_at),
  };
}

/**
 * @param {Record<string, unknown>} row
 * @returns {PaymentEvent}
 */
export function paymentEventFromRow(row) {
  return {
    id: /** @type {string} */ (row.id),
    paymentId: String(row.payment_id ?? row.paymentId),
    providerEventId:
      row.provider_event_id == null && row.providerEventId == null
        ? null
        : String(row.providerEventId ?? row.provider_event_id),
    eventType: String(row.event_type ?? row.eventType),
    payloadHash:
      row.payload_hash == null && row.payloadHash == null
        ? null
        : String(row.payloadHash ?? row.payload_hash),
    processed: Boolean(row.processed),
    createdAt: String(row.created_at ?? row.createdAt),
  };
}

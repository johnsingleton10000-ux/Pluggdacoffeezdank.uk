export type EntityId = string;
export type IsoDateTime = string;

export interface AuditedEntity {
  id: EntityId;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export type LifecycleStatus =
  | "draft"
  | "active"
  | "suspended"
  | "archived";

export interface PaginatedResult<T> {
  items: readonly T[];
  nextCursor: string | null;
}

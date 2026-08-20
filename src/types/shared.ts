export type EntityId = string;
export type IsoDateTime = string;

export interface AuditedEntity {
  readonly id: EntityId;
  readonly createdAt: IsoDateTime;
  readonly updatedAt: IsoDateTime;
}

export type ServiceResult<T, Code extends string = string> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly code: Code; readonly message: string };

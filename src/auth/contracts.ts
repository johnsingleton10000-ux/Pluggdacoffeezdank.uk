import type { EntityId, ServiceResult } from "@/types/shared";

export interface AuthenticatedUser {
  readonly id: EntityId;
  readonly email: string | null;
}

export interface AuthService {
  getCurrentUser(): Promise<AuthenticatedUser | null>;
  requireUser(): Promise<
    ServiceResult<AuthenticatedUser, "UNAUTHENTICATED">
  >;
}

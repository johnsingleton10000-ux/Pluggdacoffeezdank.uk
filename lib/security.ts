import { DcbdForbiddenError } from "@/lib/errors";

export function assertServerOnly(): void {
  if (typeof window !== "undefined") {
    throw new DcbdForbiddenError("This operation must run on the server.");
  }
}

export function assertSameUser(actorId: string, resourceOwnerId: string): void {
  if (actorId !== resourceOwnerId) {
    throw new DcbdForbiddenError("You can only access your own account data.");
  }
}

export function assertPositiveInt(value: number, label: string): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${label} must be a positive integer.`);
  }
}

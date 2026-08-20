import "server-only";

export class DataStoreNotConfiguredError extends Error {
  constructor(message = "The DCBD data store is not configured yet.") {
    super(message);
    this.name = "DataStoreNotConfiguredError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "You are not authorised to access this resource.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "This action is not allowed.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

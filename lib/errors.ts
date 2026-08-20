export class DcbdError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(code: string, message: string, status = 400) {
    super(message);
    this.name = "DcbdError";
    this.code = code;
    this.status = status;
  }
}

export class DcbdConfigError extends DcbdError {
  constructor(message: string) {
    super("not_configured", message, 503);
    this.name = "DcbdConfigError";
  }
}

export class DcbdAuthError extends DcbdError {
  constructor(message: string, status = 401) {
    super("unauthorized", message, status);
    this.name = "DcbdAuthError";
  }
}

export class DcbdForbiddenError extends DcbdError {
  constructor(message = "You are not allowed to access this resource.") {
    super("forbidden", message, 403);
    this.name = "DcbdForbiddenError";
  }
}

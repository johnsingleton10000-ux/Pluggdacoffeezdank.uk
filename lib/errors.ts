export class DcbdError extends Error {
  constructor(
    public code: string,
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}

export class DcbdForbiddenError extends DcbdError {
  constructor(message: string) {
    super("forbidden", message, 403);
  }
}

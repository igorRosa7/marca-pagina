export interface ErrorDetail {
  field: string;
  message: string;
}

export abstract class AppError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly details?: ErrorDetail[],
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class ValidationError extends AppError {
  constructor(details: ErrorDetail[]) {
    super("VALIDATION_ERROR", "Dados inválidos.", details);
  }
}

export class UnauthorizedError extends AppError {}

export class ForbiddenError extends AppError {}

export class NotFoundError extends AppError {}

export class ConflictError extends AppError {}

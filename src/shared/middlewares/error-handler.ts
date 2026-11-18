import type { ErrorRequestHandler, RequestHandler } from "express";
import {
  AppError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
  type ErrorDetail,
} from "../errors.js";

interface ErrorBody {
  code: string;
  message: string;
  details?: ErrorDetail[];
}

function statusOf(error: AppError): number {
  if (error instanceof ValidationError) return 400;
  if (error instanceof UnauthorizedError) return 401;
  if (error instanceof ForbiddenError) return 403;
  if (error instanceof NotFoundError) return 404;
  if (error instanceof ConflictError) return 409;
  return 500;
}

function toBody(error: AppError): ErrorBody {
  const body: ErrorBody = { code: error.code, message: error.message };
  if (error.details) body.details = error.details;
  return body;
}

function isMalformedJson(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === "entity.parse.failed"
  );
}

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new NotFoundError("ROUTE_NOT_FOUND", "Rota não encontrada."));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(statusOf(error)).json(toBody(error));
    return;
  }

  if (isMalformedJson(error)) {
    res.status(400).json({ code: "INVALID_JSON", message: "JSON inválido." });
    return;
  }

  console.error(error);
  res
    .status(500)
    .json({ code: "INTERNAL_ERROR", message: "Erro interno do servidor." });
};

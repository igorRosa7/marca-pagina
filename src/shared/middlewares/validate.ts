import type { RequestHandler } from "express";
import { z } from "zod";
import { ValidationError } from "../errors.js";

z.config(z.locales.ptBR());

export function validate(schema: z.ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      next(new ValidationError(details));
      return;
    }

    req.body = result.data;
    next();
  };
}

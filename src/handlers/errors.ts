import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "./response";
import type { ZodError } from "zod";

const zodErrorMessage = (err: ZodError): string => {
  const [firstIssue] = err.issues;
  const { code } = firstIssue;
  switch (code) {
    default: {
      return `Input data is wrong.`;
    }
  }
};

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  switch (err.name) {
    case "NotFoundError":
      return send(res).notFound();
    case "ZodError":
      return send(res).badRequest(zodErrorMessage(err));
    case "PrismaClientKnownRequestError":
      switch (err.code) {
        case "P2002":
          return send(res).conflict(err)
        case "P2025":
          return send(res).notFound();
        default:
          return send(res).internalError(`Internal error.`);
      }
    default:
      return send(res).internalError(`Internal error.`);
  }
};

export const catchErrors =
  (myHandler: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await myHandler(req, res, next);
    } catch (e) {
      next(e);
    }
  };

import type { ErrorRequestHandler, RequestHandler } from "express";
import { send } from "./response";

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.log(err.name);
  switch (err.name) {
    case "NotFoundError":
      return send(res).notFound();
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

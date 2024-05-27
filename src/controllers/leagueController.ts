import type { NextFunction, Request, Response } from "express";
import db from "../db/db";
import { send } from "../handlers/response";
import { catchErrors } from "../handlers/errors";

export class LeagueController {
  getAllLeagues = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const leagues = await db.league.findMany();
    send(res).ok(leagues);
  });
}

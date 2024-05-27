import type { NextFunction, Request, Response } from "express";
import db from "../db/db";
import { send } from "../handlers/response";
import { catchErrors } from "../handlers/errors";
import { z } from "zod";

const idParamSchema = z.object({
  id: z.coerce.number(),
});

export class LeagueController {
  getAllLeagues = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const leagues = await db.league.findMany();
    send(res).ok(leagues);
  });

  getLeagueById = catchErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id: leagueId } = idParamSchema.parse(req.params);
      const league = await db.league.findUniqueOrThrow({ where: { leagueId } })
      send(res).ok(league)
    }
  )
}

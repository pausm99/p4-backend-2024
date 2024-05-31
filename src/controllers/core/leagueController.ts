import type { Request, Response } from "express";
import { z } from "zod";
import db from "../../db/db";
import { catchErrors } from "../../handlers/errors";
import { send } from "../../handlers/response";

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const leagueBodySchema = z.object({
  name: z.string().min(3).max(50),
  country: z.string().min(1).max(50),
});

export class LeagueController {
  getAllLeagues = catchErrors(async (req: Request, res: Response) => {
    const leagues = await db.league.findMany();
    send(res).ok(leagues);
  });

  getLeagueById = catchErrors(async (req: Request, res: Response) => {
    const { id: leagueId } = idParamSchema.parse(req.params);
    const league = await db.league.findUniqueOrThrow({ where: { leagueId } });
    send(res).ok(league);
  });

  createLeague = catchErrors(async (req: Request, res: Response) => {
    const data = leagueBodySchema.parse(req.body);
    const league = await db.league.create({ data });
    send(res).createOk(league);
  });

  deleteLeague = catchErrors(async (req: Request, res: Response) => {
    const { id: leagueId } = idParamSchema.parse(req.params);
    const deletedLeague = await db.league.delete({ where: { leagueId } });
    send(res).ok(deletedLeague);
  });

  updateLeague = catchErrors(async (req: Request, res: Response) => {
    const { id: leagueId } = idParamSchema.parse(req.params);
    const leagueData = leagueBodySchema.parse(req.body);

    const updatedLeague = await db.league.update({
      where: {
        leagueId: leagueId,
      },
      data: leagueData,
    });

    return send(res).ok(updatedLeague);
  });
}

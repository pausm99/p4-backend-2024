import type { Request, Response } from "express";
import { catchErrors } from "../handlers/errors";
import { send } from "../handlers/response";
import db from "../db/db";
import { z } from "zod";

const idParamSchema = z.object({
  id: z.coerce.number(),
});

export class TeamController {
  getAllTeams = catchErrors(async (req: Request, res: Response) => {
    const teams = await db.team.findMany();
    send(res).ok(teams);
  });

  getTeamById = catchErrors(async (req: Request, res: Response) => {
    const { id: teamId } = idParamSchema.parse(req.params)
    const team = await db.team.findUniqueOrThrow({ where: { teamId } })
    send(res).ok(team)
  })
}

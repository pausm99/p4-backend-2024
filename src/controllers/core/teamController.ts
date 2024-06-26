import type { Request, Response } from "express";
import { catchErrors } from "../../handlers/errors";
import { send } from "../../handlers/response";
import db from "../../db/db";
import { z } from "zod";

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const teamBodySchema = z.object({
  name: z.string().min(3).max(50),
  leagueId: z.coerce.number().min(1),
  city: z.string().min(2).max(50),
});

export class TeamController {
  getAllTeams = catchErrors(async (req: Request, res: Response) => {
    const teams = await db.team.findMany();
    send(res).ok(teams);
  });

  getTeamById = catchErrors(async (req: Request, res: Response) => {
    const { id: teamId } = idParamSchema.parse(req.params);
    const team = await db.team.findUniqueOrThrow({ where: { teamId } });
    send(res).ok(team);
  });

  createTeam = catchErrors(async (req: Request, res: Response) => {
    const data = teamBodySchema.parse(req.body);
    const addedTeam = await db.team.create({ data });
    send(res).createOk(addedTeam);
  });

  updateTeam = catchErrors(async (req: Request, res: Response) => {
    const { id: teamId } = idParamSchema.parse(req.params)
    const data = teamBodySchema.parse(req.body);
    const updatedTeam = await db.team.update({
      where: { teamId: teamId },
      data: data
    })
    return send(res).ok(updatedTeam)
  });

  deleteTeam = catchErrors(async (req: Request, res: Response) => {
    const { id: teamId } = idParamSchema.parse(req.params);
    const deletedTeam = await db.team.delete({ where: { teamId } });
    send(res).ok(deletedTeam);
  });
}

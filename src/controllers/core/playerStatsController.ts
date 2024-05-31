import type { Request, Response } from "express";
import { z } from "zod";
import db from "../db/db";
import { catchErrors } from "../handlers/errors";
import { send } from "../handlers/response";

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const playerStatsBodySchema = z.object({
    playerId: z.coerce.number(),
    season: z.string().regex(/^\d{4}-\d{4}$/, {
        message: "season must be two positive years separated by a hyphen (e.g., 2023-2024)"
    }),
    appearances: z.coerce.number(),
    goals: z.coerce.number(),
    assists: z.coerce.number(),
    yellowCards: z.coerce.number(),
    redCards: z.coerce.number(),
})

export class PlayerStats {
  getAllStats = catchErrors(async (req: Request, res: Response) => {
    const allStats = await db.playerStats.findMany({});
    return send(res).ok(allStats);
  });

  getStatsById = catchErrors(async (req: Request, res: Response) => {
    const { id: playerStatsId } = idParamSchema.parse(req.params);
    const stats = await db.playerStats.findUniqueOrThrow({
      where: { playerStatsId },
    });
    return send(res).ok(stats);
  });

  getStatsByPlayer = catchErrors(async (req: Request, res: Response) => {
    const { id: playerId } = idParamSchema.parse(req.params);
    const playerStats = await db.playerStats.findMany({
      where: { playerId },
    });
    return send(res).ok(playerStats)
  });

  createStats = catchErrors(async (req: Request, res: Response) => {
    const data = playerStatsBodySchema.parse(req.body)
    const createdPlayerStats = await db.playerStats.create({ data })
    return send(res).createOk(createdPlayerStats)
  })

  deleteStats = catchErrors(async (req: Request, res: Response) => {
    const { id: playerStatsId } = idParamSchema.parse(req.params)
    const deletedStats = await db.playerStats.delete({
      where: { playerStatsId }
    })
    return send(res).ok(deletedStats)
  })

  deleteStatsByPlayer = catchErrors(async (req: Request, res: Response) => {
    const { id: playerId } = idParamSchema.parse(req.params)
    const deletedPlayerStats = await db.playerStats.deleteMany({
      where: { playerId }
    })
    return send(res).ok(deletedPlayerStats)
  })
}

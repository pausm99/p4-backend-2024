import type { Request, Response } from "express";
import { catchErrors } from "../handlers/errors";
import db from "../db/db";
import { send } from "../handlers/response";
import { z } from "zod";

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const playerBodySchema = z.object({
  name: z.string().min(3).max(50),
  teamId: z.coerce.number().min(1),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
  age: z.coerce.number().min(1),
  height: z.coerce.number().min(100).max(250),
  weight: z.coerce.number().min(20).max(160),
});

export class PlayerController {
  getAllPlayers = catchErrors(async (req: Request, res: Response) => {
    const players = await db.player.findMany();
    return send(res).ok(players);
  });

  getPlayerById = catchErrors(async (req: Request, res: Response) => {
    const { id: playerId } = idParamSchema.parse(req.params);
    const player = await db.player.findUniqueOrThrow({ where: { playerId } });
    return send(res).ok(player);
  });

  createPlayer = catchErrors(async (req: Request, res: Response) => {
    const data = playerBodySchema.parse(req.body);
    const addedPlayer = await db.player.create({ data: data });
    return send(res).createOk(addedPlayer);
  });

  deletePlayer = catchErrors(async (req: Request, res: Response) => {
    const { id: playerId } = idParamSchema.parse(req.params);
    const deletedPlayer = await db.player.delete({ where: { playerId } });
    return send(res).ok(deletedPlayer);
  });

  updatePlayer = catchErrors(async (req: Request, res: Response) => {
    const { id: playerId } = idParamSchema.parse(req.params);
    const data = playerBodySchema.parse(req.body);
    const updatedPlayer = await db.player.update({
      where: { playerId },
      data,
    });
    return send(res).ok(updatedPlayer);
  });
}

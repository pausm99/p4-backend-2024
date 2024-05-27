import type { Request, Response } from "express";
import db from "../db/db";
import { send } from "../handlers/response";

export class LeagueController {
  getAllLeagues = async (req: Request, res: Response) => {
    const leagues = await db.league.findMany();
    send(res).ok(leagues);
  };
}

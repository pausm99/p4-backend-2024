import express from "express";
import { LeagueController } from "../controllers/leagueController";


const router = express.Router();

const leagueController = new LeagueController();

router.route('/').get(leagueController.getAllLeagues)

export default router;
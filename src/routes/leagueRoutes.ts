import express from "express";
import { LeagueController } from "../controllers/leagueController";


const router = express.Router();

const leagueController = new LeagueController();

router.route('/').get(leagueController.getAllLeagues)
router.route('/:id').get(leagueController.getLeagueById)

export default router;
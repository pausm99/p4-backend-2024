import express from "express";
import { TeamController } from "../controllers/teamController";

const router = express.Router()

const teamController = new TeamController();

router.route('/').get(teamController.getAllTeams)
router.route('/:id').get(teamController.getTeamById)

export default router;
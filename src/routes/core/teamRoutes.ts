import express from "express";
import { TeamController } from "../../controllers/core/teamController";

const router = express.Router()

const teamController = new TeamController();

router.route('/').get(teamController.getAllTeams)
router.route('/:id').get(teamController.getTeamById)
router.route('/').post(teamController.createTeam)
router.route('/:id').delete(teamController.deleteTeam)
router.route('/:id').put(teamController.updateTeam)

export default router;
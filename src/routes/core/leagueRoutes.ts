import express from "express";
import { LeagueController } from "../../controllers/core/leagueController";


const router = express.Router();

const leagueController = new LeagueController();

router.route('/').get(leagueController.getAllLeagues)
router.route('/:id').get(leagueController.getLeagueById)
router.route('/').post(leagueController.createLeague)
router.route('/:id').delete(leagueController.deleteLeague)
router.route('/:id').put(leagueController.updateLeague)

export default router;
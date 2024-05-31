import express from "express";
import { PlayerController } from "../../controllers/core/playerController";

const router = express.Router();

const playerController = new PlayerController();

router.route('/').get(playerController.getAllPlayers)
router.route('/:id').get(playerController.getPlayerById)
router.route('/').post(playerController.createPlayer)
router.route('/:id').delete(playerController.deletePlayer)
router.route('/:id').put(playerController.updatePlayer)

export default router;
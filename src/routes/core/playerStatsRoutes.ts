import express from 'express'
import { PlayerStats } from '../../controllers/core/playerStatsController'

const router = express.Router()

const playerStats = new PlayerStats()

router.route('/').get(playerStats.getAllStats)
router.route('/topscorer').get(playerStats.getPlayerWithMostGoals)
router.route('/top3Assistants').get(playerStats.getTop3Assistants)
router.route('/player/:id').get(playerStats.getStatsByPlayer)
router.route('/:id').get(playerStats.getStatsById)
router.route('/').post(playerStats.createStats)
router.route('/:id').put(playerStats.updateStats)
router.route('/:id').delete(playerStats.deleteStats)
router.route('/player/:id').delete(playerStats.deleteStatsByPlayer)

export default router
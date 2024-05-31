import express from 'express'
import { PlayerStats } from '../controllers/playerStatsController'

const router = express.Router()

const playerStats = new PlayerStats()

router.route('/').get(playerStats.getAllStats)
router.route('/:id').get(playerStats.getStatsById)
router.route('/player/:id').get(playerStats.getStatsByPlayer)
router.route('/').post(playerStats.createStats)
router.route('/:id').delete(playerStats.deleteStats)
router.route('/player/:id').delete(playerStats.deleteStatsByPlayer)

export default router
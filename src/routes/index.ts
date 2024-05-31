import express from "express";
import leagueRoutes from "./leagueRoutes";
import teamRoutes from "./teamRoutes";
import playerRoutes from "./playerRoutes";
import playerStatsRoutes from "./playerStatsRoutes";

const router = express.Router()

router.use('/leagues', leagueRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);
router.use('/playerStats', playerStatsRoutes)

export default router;
import express from "express";
import leagueRoutes from "./leagueRoutes";
import teamRoutes from "./teamRoutes";
import playerRoutes from "./playerRoutes";

const router = express.Router()

router.use('/leagues', leagueRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);

export default router;
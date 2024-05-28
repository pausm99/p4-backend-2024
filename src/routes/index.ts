import express from "express";
import leagueRoutes from "./leagueRoutes";
import teamRoutes from "./teamRoutes";

const router = express.Router()

router.use('/leagues', leagueRoutes);
router.use('/teams', teamRoutes)

export default router;
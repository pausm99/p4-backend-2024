import express from "express";
import leagueRoutes from "./leagueRoutes";

const router = express.Router()

router.use('/leagues', leagueRoutes);

export default router;
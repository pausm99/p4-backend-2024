import express from "express";
import leagueRoutes from "./core/leagueRoutes";
import teamRoutes from "./core/teamRoutes";
import playerRoutes from "./core/playerRoutes";
import playerStatsRoutes from "./core/playerStatsRoutes";
import authRoutes from "./auth/authRoutes";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/leagues", leagueRoutes);
router.use("/teams", teamRoutes);
router.use("/players", playerRoutes);
router.use("/playerStats", playerStatsRoutes);

export default router;

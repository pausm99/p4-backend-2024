import express from "express";
import leagueRoutes from "./core/leagueRoutes";
import teamRoutes from "./core/teamRoutes";
import playerRoutes from "./core/playerRoutes";
import playerStatsRoutes from "./core/playerStatsRoutes";
import authRoutes from "./auth/authRoutes";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/leagues", authMiddleware, leagueRoutes);
router.use("/teams", authMiddleware, teamRoutes);
router.use("/players", authMiddleware, playerRoutes);
router.use("/playerStats", authMiddleware, playerStatsRoutes);

export default router;

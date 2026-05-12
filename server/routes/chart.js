import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { chartWithAI } from "../controllers/chartAI.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

router.post("/chart", isAuth, chartWithAI);

export default router;

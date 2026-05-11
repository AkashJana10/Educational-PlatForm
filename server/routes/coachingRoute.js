import express from "express";
import {
  createCoaching,
  updateCoaching,
  deleteCoaching,
  addAdmin,
  removeAdmin,
} from "../controllers/coaching.js";
import { isAuth } from "../middlewares/isAuth.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

router.post("/create",authUser, createCoaching);

router.put("/update/:id",authUser, updateCoaching);

router.delete("/delete/:id",authUser, deleteCoaching);

router.put("/add-admin/:coachingId",authUser, addAdmin);

router.put("/remove-admin/:coachingId",authUser, removeAdmin);

export default router;
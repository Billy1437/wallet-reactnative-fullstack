import express from "express";
import { sql } from "../config/db.js";
import {
  deleteTransactionById,
  getSummaryTransactionByUserId,
  getTransactionByUserId,
  makeTransaction,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactionByUserId);

router.post("/", makeTransaction);

router.delete("/:id", deleteTransactionById);

router.get("/summary/:userId", getSummaryTransactionByUserId);

export default router;

import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import {
  addExpense,
  deleteExpense,
  getUserExpenses,
  updateExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.get("/getExpense", isLoggedIn, getUserExpenses);
router.post("/addExpense", isLoggedIn, addExpense);
router.put("/updateExpense/:id", isLoggedIn, updateExpense);
router.delete("/deleteExpense/:id", isLoggedIn, deleteExpense);

export default router;

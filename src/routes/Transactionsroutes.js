import express from "express";
import {getTransactionByUserId} from "../controllers/transactionsControllers.js";
import {getSummaryByUserId} from "../controllers/transactionsControllers.js";
import {createTransactions} from "../controllers/transactionsControllers.js";
import {deleteTransactionsByUserId} from "../controllers/transactionsControllers.js"
import { graphedData } from "../controllers/transactionsControllers.js";

const router= express.Router();

// adds a get route so that when called it responds with that message
router.get("/:userId", getTransactionByUserId)
  
// getting the summary
router.get("/summary/:userId",getSummaryByUserId)
  
// post method creates or updates data (sending data)
router.post("/", createTransactions)
  
// Deleting using user id
router.delete("/:id", deleteTransactionsByUserId)
  
//graphed data API
router.get("/graph/:userId", graphedData);

export default router
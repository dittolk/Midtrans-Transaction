import { Router } from "express";
import { createPayment, createTransaction, getUserTransaction } from "../controllers/transaction.controller.js";

const transactionRouter = Router();

transactionRouter.post('/checkout', createTransaction)
transactionRouter.get('/:userId', getUserTransaction)
transactionRouter.post('/payment', createPayment)

export { transactionRouter }
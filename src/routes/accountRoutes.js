import express from "express";
import { getAccounts, createAccount, getAccountById, deleteAccount } from "../controllers/accountController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getaccount", authMiddleware, getAccounts);
router.post("/createaccount", authMiddleware, createAccount);
router.get("/getaccount/:id", authMiddleware, getAccountById);
router.delete("/deleteaccount/:id", authMiddleware, deleteAccount);

export default router;

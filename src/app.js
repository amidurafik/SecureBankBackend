// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";
import bankingRoutesRoutes from "./routes/bankingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev")); // logs requests
app.use(express.json()); // parse JSON

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);


export default app;

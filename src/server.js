// src/server.js
import app from "./app.js";
import { prisma } from "./prisma/client.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // test DB connection
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error);
    process.exit(1);
  }
}

startServer();
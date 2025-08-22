import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Get all accounts for logged-in user
export const getAccounts = async (req, res) => {
  console.log("Decoded token payload:", req.user); // <-- debug
  try {
    const userId = req.user.id; // comes from JWT middleware

    const account = await prisma.account.findUnique({
      where: { id: userId },
    });

    res.status(200).json({ account });
  } catch (err) {
    console.error("GET ACCOUNTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch accounts" });
  }
};

// ✅ Create a new account
export const createAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type, currency } = req.body;

    const account = await prisma.account.create({
      data: {
        type,
        balance: 0,
        currency: currency || "USD",
        userId,
      },
    });

    res.status(201).json({ account });
  } catch (err) {
    console.error("CREATE ACCOUNT ERROR:", err);
    res.status(500).json({ message: "Failed to create account" });
  }
};

// ✅ Get one account by ID
export const getAccountById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const account = await prisma.account.findFirst({
      where: { id, userId },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ account });
  } catch (err) {
    console.error("GET ACCOUNT ERROR:", err);
    res.status(500).json({ message: "Failed to fetch account" });
  }
};

// ✅ Delete account (optional for dev/testing)
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const account = await prisma.account.findFirst({
      where: { id, userId },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    await prisma.account.delete({ where: { id } });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("DELETE ACCOUNT ERROR:", err);
    res.status(500).json({ message: "Failed to delete account" });
  }
};

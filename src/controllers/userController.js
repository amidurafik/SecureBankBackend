import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    // `req.user` is attached by the authenticate middleware
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        accounts: true
      }
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

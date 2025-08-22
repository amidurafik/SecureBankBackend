import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

//name

// Register user
export const register = async (req, res) => {
  try {
    const { email, phone, password, firstName, lastName } = req.body;
    const hashedPassword = await hashPassword(password);

    // Check if user already exists by email or phone
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with the same email or phone number exists" });
    }

    // Create user and default accounts
    const user = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        firstName,
        lastName,
        accounts: {
          create: [
            { type: "SAVINGS", balance: 0.0, currency: "USD" },
            { type: "CHECKING", balance: 0.0, currency: "USD" },
            { type: "INVESTMENT", balance: 0.0, currency: "USD" }
          ]
        }
      },
      include: { accounts: true }
    });
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


// Login user
export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrPhone },
          { phone: emailOrPhone }
        ]
      }
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      }
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err); // this will show full error in terminal
    res.status(500).json({ error: err.message });
  }
};





import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // 1. Get token from headers
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user to request
    req.user = decoded;

    // 4. Move to next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

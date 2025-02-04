import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => { // 🔹 Explicit return type (void)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Authorization token required" });
     return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    (req as any).user = user;
    next();
  });
};

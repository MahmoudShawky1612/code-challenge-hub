import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { comparePassword, generateToken, hashPassword, logInSchema, signUpSchema } from "../services/auth.service";

const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  try {
    const validatedData = signUpSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await hashPassword(validatedData.password);

    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        username: validatedData.username,
      },
    });

    const token = generateToken(newUser.id);

    return res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message || "Invalid data" });
    }
    return res.status(400).json({ message: "Invalid data" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const validatedData = logInSchema.parse(req.body);

    
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await comparePassword(validatedData.password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    return res.status(200).json({ message: "logIn successful", token: generateToken(user.id) });
  } catch (error) {
    if (error instanceof Error) {
        return res.status(400).json({ message: error.message || "Invalid data" });
      }
      return res.status(400).json({ message: "Invalid data" });
  }
};

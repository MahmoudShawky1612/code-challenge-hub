import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signUpSchema = z.object({
    email:z.string().email("Invalid email format"),
    password:z.string().min(6, "Password must be at least 6 characters"),
    username:z.string().min(3, "Username must be at least 3 characters"),
});
export const logInSchema = z.object({
    email:z.string(),
    password:z.string(),
});

export const hashPassword = async (password: string):Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password:string, hashedPassword:string): Promise<boolean> =>{
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string, username: string,): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ userId, username }, process.env.JWT_SECRET, { expiresIn: '10d' });
}
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const addComment = async (req: Request, res: Response) => {
  const { solutionId } = req.params; 
  const { content } = req.body;

  try {
    if (!(req as any).user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

const newComment = await prisma.comment.create({
        data: {
        content,
        user: {
          connect: { id: (req as any).user.userId },
        },
        solution: {
          connect: { id: solutionId }, 
        },
      },
    });

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment" });
  }
};


export const getCommentsBySolution = async (req: Request, res: Response) => {
  const { solutionId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { solutionId },
      include: { user: true },
    });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving comments" });
  }
};


import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
import { z } from 'zod';
const prisma = new PrismaClient();

const challengeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
})

const solutionSchema = z.object({
  code: z.string().min(10, "Solution code must be at least 10 characters long"),
});

export const createChallenge = async (req: Request, res: Response) => {
    try {

        if (!(req as any).user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const validateData = challengeSchema.parse(req.body);

        const newChallenge = await prisma.challenge.create({
            data:{
                title: validateData.title,
                description: validateData.description,
                difficulty: validateData.difficulty,
                user: {
                    connect: { id: (req as any).user.userId }, // Connect the challenge to the authenticated user
                  },
                
            }
        });

        

        return res.status(201).json(newChallenge);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message || "Invalid data" });
        }
        return res.status(400).json({ message: "Invalid data" });
    }
}

export const getAllChallenges = async (req: Request, res: Response) => {
    try {
    const challenges = await prisma.challenge.findMany();
    return res.status(200).json(challenges);
    }catch (error) {
    return res.status(500).json({ message: "Error retrieving challenges" });
    }
}

export const getChallengeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const challenge = await prisma.challenge.findUnique({
        where: { id },
      });

      const challengeMaker = await prisma.challenge.findUnique({
        where:{id},
        select: {
          userId: true,
      },
      });
  
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
  
      return res.status(200).json(challenge);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving challenge" });
    }
  };


  export const submitSolution = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { code } = solutionSchema.parse(req.body);
  
      if (!(req as any).user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const challenge = await prisma.challenge.findUnique({
        where: { id },
      });
  
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
  
      const newSolution = await prisma.solution.create({
        data: {
          code,
          user: {
            connect: { id: (req as any).user.userId },
          },
          challenge: {
            connect: { id: id },
          },
        },
      });
  
      return res.status(201).json(newSolution);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message || "Invalid solution data" });
      }
      return res.status(400).json({ message: "Invalid solution data" });
    }
  };


  export const getSolutionsByChallenge = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const challenge = await prisma.challenge.findUnique({
        where: { id },
        include: { solutions: true },
      });
  
      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }
  
      return res.status(200).json(challenge.solutions);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving solutions" });
    }
  };

export const acceptSolution = async(req:Request, res:Response)=>{
    try {
      const {id, solutionId} = req.params;

      const challenge = await prisma.challenge.findUnique({
        where:{id}
      })

      if(!challenge) return res.status(404).json({message:"Challenge not found"});

      const solution = await prisma.solution.findUnique({
        where:{id:solutionId}
      })

      if(!solution) return res.status(404).json({message:"Solution not found"});
      const challengeMaker = await prisma.challenge.findUnique({
        where:{id},
        select: {
          userId: true,
      },
      });

      if (challengeMaker?.userId !== (req as any).user.userId) {
        return res.status(401).json({ message: "You are not allowed to do this action" });
      }

      const acceptedSolution = await prisma.solution.update({
        where: { id: solutionId },
        data: { accepted: true },
      });
  
      return res.status(200).json(acceptedSolution);
    } catch (error) {
      return res.status(500).json({ message: "Error accepting solution" });
    }
  };
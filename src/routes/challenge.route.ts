import { Router, Request, Response } from "express";
import { createChallenge, getAllChallenges, getChallengeById } from "../controllers/challenge.controller";
import {authenticateJWT} from '../middleware/auth.middleware';

const router = Router();

router.post("/challenges", authenticateJWT, async (req: Request, res: Response) => {
    await createChallenge(req, res)});

router.get("/challenges", async (req: Request, res: Response) => {
    await getAllChallenges(req, res)});

router.get("/challenges/:id", async (req: Request, res: Response) => {
    await getChallengeById(req, res)});

export default router;

import { Request, Response, Router } from "express";
import { createChallenge, getAllChallenges, getChallengeById, submitSolution } from "../controllers/challenge.controller";
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post("/challenges", authenticateJWT, async (req: Request, res: Response) => {
    await createChallenge(req, res)});

router.get("/challenges", async (req: Request, res: Response) => {
    await getAllChallenges(req, res)});

router.get("/challenges/:id", async (req: Request, res: Response) => {
    await getChallengeById(req, res)});

router.post("/challenges/:id/solutions", authenticateJWT, async (req: Request, res: Response) => {
    await submitSolution(req, res);
});

export default router;

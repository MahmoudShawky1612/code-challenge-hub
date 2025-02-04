import { Request, Response, Router } from "express";
import { createChallenge, getAllChallenges, getChallengeById, submitSolution, getSolutionsByChallenge, acceptSolution, updateChallengeStatus } from "../controllers/challenge.controller";
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post("/challenges", authenticateJWT, async (req: Request, res: Response) => {
    await createChallenge(req, res)});

router.get("/challenges", async (req: Request, res: Response) => {
    await getAllChallenges(req, res)});

router.get("/challenges/:id", async (req: Request, res: Response) => {
    await getChallengeById(req, res)});

//Submit Solution For A Challenge
router.post("/challenges/:id/solutions", authenticateJWT, async (req: Request, res: Response) => {
    await submitSolution(req, res);
});

//  route to get all solutions for a challenge
router.get("/challenges/:id/solutions", async (req: Request, res: Response) => {
    await getSolutionsByChallenge(req, res);
  });
  
//  route to accept a solution
  router.patch("/challenges/:id/solutions/:solutionId/accept", authenticateJWT, async (req: Request, res: Response) => {
    await acceptSolution(req, res);
  });

router.patch("/challenges/:id/status", authenticateJWT, async (req: Request, res: Response) => {
    await updateChallengeStatus(req, res);
  });
  
export default router;

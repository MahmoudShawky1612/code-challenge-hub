import { Router, Request, Response } from "express";
import { addComment, getCommentsBySolution } from '../controllers/comment.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post("/solutions/:solutionId/comments", authenticateJWT, async (req: Request, res: Response) => {
    await addComment(req, res)});

router.get("/solutions/:solutionId/comments", async (req: Request, res: Response) => {
    await getCommentsBySolution(req, res)});

export default router;

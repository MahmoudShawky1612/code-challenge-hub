import { Request, Response, Router } from "express";
import { logIn, signUp } from '../controllers/auth.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
    await signUp(req, res);
});

router.post("/login", authenticateJWT,async (req: Request, res: Response) => {
    await logIn(req, res);
});



export default router;
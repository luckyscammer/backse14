import userRouter from "@router/userRouter";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("✅ API is running!");
});

router.use("/users", userRouter);

export default router;

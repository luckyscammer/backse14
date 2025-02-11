import userRoutes from "routes/user.routes";
import projectRoutes from "routes/project.routes";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("✅ API is running!");
});

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);

export default router;

import { asyncHandler } from "@middlewares";
import { Router } from "express";
import { TaskController } from "@controllers";

const router = Router();

router.post("/", asyncHandler(TaskController.create));
router.get("/:project_id", asyncHandler(TaskController.getAllByProject));
router.put("/:id", asyncHandler(TaskController.update));
router.delete("/:id", asyncHandler(TaskController.delete));

export default router;

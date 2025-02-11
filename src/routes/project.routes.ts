import { ProjectController } from "@controllers";
import { asyncHandler } from "@middlewares";
import { Router } from "express";

const router = Router();

router.get("/", asyncHandler(ProjectController.getAll));
router.get("/:id", asyncHandler(ProjectController.getById));
router.get("/owner/:owner_id", asyncHandler(ProjectController.getByOwner));
router.put("/:id", asyncHandler(ProjectController.updateById));
router.delete("/:id", asyncHandler(ProjectController.deleteById));

export default router;
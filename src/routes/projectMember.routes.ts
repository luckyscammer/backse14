import { ProjectMemberController } from "@controllers";
import { asyncHandler } from "@middlewares";
import { Router } from "express";

const router = Router();

router.post("/add", asyncHandler(ProjectMemberController.addMember));
router.delete("/remove", asyncHandler(ProjectMemberController.removeMember));
router.get("/:project_id", asyncHandler(ProjectMemberController.getMembers));

export default router;
import { UserController } from "@controllers";
import { asyncHandler } from "@middlewares";
import { Router  } from "express";

const router = Router();

router.get("/", asyncHandler(UserController.getAllUsers));
router.post("/", asyncHandler(UserController.createNewUser));
router.get("/:id", asyncHandler(UserController.getUser));
router.put("/:id", asyncHandler(UserController.updateUser));
router.delete("/:id", asyncHandler(UserController.deleteUser));
router.post("/:id/project", asyncHandler(UserController.createProjectForUser))

export default router;

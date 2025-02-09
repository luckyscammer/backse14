import { createNewUser, deleteUser, getAllUsers, getUser, updateUser } from "@controllers";
import { asyncHandler } from "@middlewares";
import { Router  } from "express";

const router = Router();

router.get("/", asyncHandler(getAllUsers));
router.post("/", asyncHandler(createNewUser));
router.get("/:id", asyncHandler(getUser));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

export default router;

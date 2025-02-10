import { createNewUser, deleteUser, getAllUsers, getUser, updateUser, getUserByEmail } from "@controllers";
import { asyncHandler } from "@middlewares";
import { Router  } from "express";

const router = Router();

router.get("/all", asyncHandler(getAllUsers));
router.post("/", asyncHandler(createNewUser));
router.get("/:id", asyncHandler(getUser));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));
router.get("/", asyncHandler(getUserByEmail));

export default router;

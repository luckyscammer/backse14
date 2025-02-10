import { Request, Response } from "express";
import {createUser, deleteUserById, getUsers, getUserById, User, updateUserById, getUserByEmail as getUserByEmailFunc} from "@models";

export const getAllUsers = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (email) {
    if (typeof email !== "string") {
      return res.status(400).json({ message: "Email must be a string" });
    }

    const user = await getUserByEmailFunc(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  }

  const users = await getUsers();
  res.json(users);
};


export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await getUserById(Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const createNewUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields (name, email, password) are required" });
  }

  const newUser: User = await createUser({ name, email, password });
  res.status(201).json(newUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const deletedUser = await deleteUserById(Number(id));

  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully", user: deletedUser });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const existingUser = await getUserById(Number(id));
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedData: Partial<User> = {};
  if (name) updatedData.name = name;
  if (email) updatedData.email = email;
  if (password) updatedData.password = password;

  if (Object.keys(updatedData).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const updatedUser = await updateUserById(Number(id), updatedData);
  res.json({ message: "User updated successfully", user: updatedUser });
};

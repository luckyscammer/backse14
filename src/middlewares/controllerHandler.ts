import { Response } from "express";

export const handleError = (res: Response, error: unknown) => {
  console.error("Controller Error:", error);

  const message = error instanceof Error ? error.message : "Unknown error";
  res.status(500).json({ message: "Server error", error: message });
};

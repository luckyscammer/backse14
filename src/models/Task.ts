import db from "@config";

export type TaskStatus = "new" | "in_progress" | "done";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  project_id: number;
  assignee_id?: number | null;
  created_at: Date;
  deadline?: Date | null;
}

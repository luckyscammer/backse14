import db from "@config";

export interface ProjectMember {
  id: number;
  project_id: number;
  user_id: number;
}

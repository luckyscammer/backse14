import db from "@config";

export interface Project {
  id: number;
  name: string;
  owner_id: number;
  created_at: Date;
}

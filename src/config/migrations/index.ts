import { createUsersTable } from "./0001_create_users";
import { createProjectsTable } from "./0002_create_projects";
import { createTasksTable } from "./0003_create_tasks";
import { createProjectMembersTable } from "./0004_create_project_members";

const migrations = [
  createUsersTable,
  createProjectsTable,
  createTasksTable,
  createProjectMembersTable
];

export async function runMigrations() {
  try {
    for (const migrate of migrations) {
      await migrate();
      console.log(`✅ Migration ${migrate.name} completed.`);
    }
    console.log("🎉 All migrations applied!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

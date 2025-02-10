import db from "@config";

const createProjectMembersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS project_members  (
      id SERIAL PRIMARY KEY,
      project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE (project_id, user_id)
    );
  `;

  try {
    await db.query(query);
  } catch (error) {
    console.error("❌ Error creating 'project_members ' table:", error);
  }
};

export default createProjectMembersTable;

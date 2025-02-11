import db from "@config";

export const createTasksTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT CHECK (status IN ('new', 'in_progress', 'done')) DEFAULT 'new',
      project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      assignee_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      deadline TIMESTAMP
    );
  `;

  try {
    await db.query(query);
  } catch (error) {
    console.error("❌ Error creating 'tasks' table:", error);
  }
};


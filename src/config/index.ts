import db from './db'

export default db;
export { default as createUsersTable } from '@config/migrations/createUsersTable';
export { default as createTasksTable } from '@config/migrations/createTasksTable';
export { default as createProjectsTable } from '@config/migrations/createProjectsTable';
export { default as createProjectMembersTable } from '@config/migrations/createProjectMembersTable';
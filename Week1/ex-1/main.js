import mysql from 'mysql2/promise';
import { createDBQuery, createTablesQueries, insertDataQueries } from './queries.js';

export const dbConfig = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
}

const setupDatabase = async () => {
  let dbConnection;
  try {
    dbConnection = await mysql.createConnection(dbConfig);
    await dbConnection.query(createDBQuery);
    await dbConnection.query(createTablesQueries);
    await dbConnection.query(insertDataQueries);
    console.log('✓ Database and tables created, data inserted');
  } catch (error) {
    console.error(`✕ Error during database setup: ${error.message}`);
  } finally {
    if (dbConnection) await dbConnection.end();
  }
}

setupDatabase();
import mysql from 'mysql2/promise';
import { worldDatabaseQueries } from './queries.js';

const dbConfig = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
};

const createDbConnection = async () => {
  try {
    const dbConnection = await mysql.createConnection(dbConfig);
    console.log('✓ Successfully connected to database');
    return dbConnection;
  } catch (error) {
    console.error(`✕ Failed to connect to database: ${error.message}`);
    throw error;
  }
};

const runAndLogQueries = async (dbConnection, queries) => {
  for (const { description, query } of queries) {
    try {
      const [result, _] = await dbConnection.query(query);
      console.log(`\n********** ${description} **********\n`);
      result.length
        ? result.forEach((row) => console.log(Object.values(row).join('')))
        : console.log('✕ Nothing was found.');
    } catch (error) {
      console.error(`✕ Failed to execute query: ${error.message}`);
    }
  }
};

const main = async () => {
  let dbConnection;
  try {
    dbConnection = await createDbConnection();
    await runAndLogQueries(dbConnection, worldDatabaseQueries);
  } catch (error) {
    console.error(`✕ Error: ${error.message}`);
  } finally {
    if (dbConnection) await dbConnection.end();
  }
};

main();
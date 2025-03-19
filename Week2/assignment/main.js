import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import { pool } from './db.js';
import { createAuthorsTable, addMentorColumn } from './ex-1.js';
import { createResearchTables, insertData } from './ex-2.js';
import { runJoinQueries } from './ex-3.js';
import { runAggregateQueries } from './ex-4.js';

const createResearchDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await connection.query('CREATE DATABASE IF NOT EXISTS research_db');
    console.log(`✓ Database is ready.`);
  } catch (error) {
    console.error(`✕ Error initializing database: ${error.message}`);
  } finally {
    await connection.end();
  }
};

const main = async () => {
  try {
    await createResearchDatabase();

    // ex-1 queries:
    await createAuthorsTable();
    await addMentorColumn();

    // ex-2 queries:
    await createResearchTables();
    await insertData();

    // ex-3 queries:
    await runJoinQueries();

    // ex-4 queries:
    await runAggregateQueries();

    console.log('All done.')
  } catch (error) {
    console.error(`✕ Something went wrong: ${error.message}`)
  } finally {
    await pool.end();
  }
};

main();

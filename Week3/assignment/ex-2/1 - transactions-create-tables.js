// 1. Create two tables `account` and `account_changes` (write transactions-create-tables.js file)
// 2. `account` table should have following fields : `account_number, balance`.
// 3. `account_changes` table should have the following
//    fields : `change_number, account_number, amount, changed_date, remark`.
// 4. Choose the appropriate data types and keys for these tables.

import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const createTables = async () => {
  const dbConnection = await pool.getConnection();
  try {
    await dbConnection.beginTransaction();

    await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS account (
        account_number INT AUTO_INCREMENT PRIMARY KEY,
        balance DECIMAL(10,2) NOT NULL
      );
    `);

    await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(10,2) NOT NULL,
        changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE CASCADE
      );
    `);

    await dbConnection.commit();
    console.log(`'account' and 'account_changes' tables created`);
  } catch (error) {
    await dbConnection.rollback();
    console.error(`Error creating tables: ${error}`);
  } finally {
    dbConnection.release();
  }
};

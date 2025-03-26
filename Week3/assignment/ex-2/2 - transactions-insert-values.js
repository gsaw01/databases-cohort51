import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const insertData = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const sqlQuery = 'INSERT INTO account (balance) VALUES (?), (?)';
    const values = [5000, 3000];

    await connection.query(sqlQuery, values);
    await connection.commit();

    console.log('Sample data inserted to account table.');
  } catch (error) {
    await connection.rollback();
    console.error(`Error inserting data to account table: ${error}`);
  } finally {
    connection.release();
  }
};

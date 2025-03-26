import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const sendMoney = async (sender, receiver, amount) => {
  const dbConnection = await pool.getConnection();
  try {
    const [rows] = await dbConnection.query(
      'SELECT balance FROM account WHERE account_number = ? FOR UPDATE',
      [sender]
    );

    if (rows.length === 0 || rows[0].balance < amount) {
      throw new Error('Balance is too low');
    }

    await dbConnection.query(
      'UPDATE account SET balance = balance - ? WHERE account_number = ?',
      [amount, sender]
    );

    await dbConnection.query(
      'UPDATE account SET balance = balance + ? WHERE account_number = ?',
      [amount, receiver]
    );

    await dbConnection.query(
      'INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)',
      [sender, -amount, `Transfer to ${receiver}`]
    );

    await dbConnection.query(
      'INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)',
      [receiver, amount, `Transfer from ${sender}`]
    );

    await dbConnection.commit();
    console.log('Transaction done.');
  } catch (error) {
    await dbConnection.rollback();
    console.error(`Transaction failed: ${error}`);
  } finally {
    dbConnection.release();
  }
};

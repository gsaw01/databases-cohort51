// Exercise 1: Keys
// 1. Create a table, called authors. Give it the following fields:
//    (author_id(Primary Key), author_name, university, date_of_birth, h_index, gender)
// 2. Write a query that adds a column called mentor to authors table that references the column author_id.
//    For integrity add a foreign key on this column.

import { pool } from './db.js';

export const createAuthorsTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS authors (
        author_id INT AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        university VARCHAR(255),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('Male', 'Female', 'Other')
      );
    `;
    await pool.query(query);
    console.log('✓ Authors table created.');
  } catch (error) {
    console.error(`✕ Error while creating authors table: ${error.message}`);
  }
}

export const addMentorColumn = async () => {
  try {
    const query = `
      ALTER TABLE authors 
      ADD COLUMN mentor INT, 
      ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL;
    `;
    await pool.query(query);
    console.log('✓ Mentor column added.');
  } catch (error) {
    console.error(`✕ Error while adding mentor column: ${error.message}`);
  }
}

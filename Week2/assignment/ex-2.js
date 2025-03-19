// Exercise 2: Relationships
// 1). Create another table, called research_Papers with the following fields:
//     (paper_id, paper_title, conference, publish_date, ...)
// 2). What is the relationship between Authors and Research papers? Make necessary changes to authors and research_Papers tables
//     and add more tables if necessary.
// 3). Read exercises 3 and 4 and then add information (insert rows) of 15 authors and 30 research papers
//     such that all queries in the exercises 3 and 4 will return some answers.

import { pool } from './db.js';

export const createResearchTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(255) NOT NULL,
      conference VARCHAR(255),
      publish_date DATE
    );`,
  
    `CREATE TABLE IF NOT EXISTS author_paper (
      author_id INT,
      paper_id INT,
      PRIMARY KEY (author_id, paper_id),
      FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
      FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
    );`
  ];

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    console.log(`✓ 'research_papers' and 'author_paper' tables created.`);
  } catch (error) {
    console.error(`✕ Error creating tables: ${error.message}`);
  }
}

export const insertData = async () => {
  try {
    await pool.query(`
      INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) 
      VALUES
      ('author1', 'university1', '1980-05-10', 45, 'Female', NULL),
      ('author2', 'university2', '1975-08-22', 38, 'Male', 1),
      ('author3', 'university3', '1990-02-14', 29, 'Male', 1),
      ('author4', 'university4', '1985-07-07', 50, 'Female', NULL),
      ('author5', 'university5', '1978-12-30', 42, 'Female', 4),
      ('author6', 'university6', '1982-09-25', 35, 'Male', 2),
      ('author7', 'university7', '1993-06-18', 27, 'Female', 3),
      ('author8', 'university8', '1987-11-12', 39, 'Male', 2),
      ('author9', 'university9', '1995-04-02', 22, 'Female', 5),
      ('author10', 'university10', '1981-10-19', 48, 'Male', 4),
      ('author11', 'university11', '1992-07-08', 32, 'Female', 6),
      ('author12', 'university12', '1984-03-15', 44, 'Male', 7),
      ('author13', 'university13', '1996-01-25', 28, 'Female', 8),
      ('author14', 'university14', '1983-05-06', 37, 'Male', 9),
      ('author15', 'university15', '1997-09-29', 25, 'Female', 10);
    `);

    console.log('✓ Inserted 15 authors');

    await pool.query(`
      INSERT INTO research_papers (paper_title, conference, publish_date)
      VALUES
      ('paper1', 'conference1', '2021-12-01'),
      ('paper2', 'conference2', '2020-07-10'),
      ('paper3', 'conference3', '2019-06-15'),
      ('paper4', 'conference4', '2022-01-05'),
      ('paper5', 'conference5', '2021-04-20'),
      ('paper6', 'conference6', '2018-09-11'),
      ('paper7', 'conference7', '2020-02-27'),
      ('paper8', 'conference8', '2022-06-05'),
      ('paper9', 'conference9', '2019-09-15'),
      ('paper10', 'conference10', '2023-03-30'),
      ('paper11', 'conference11', '2020-10-18'),
      ('paper12', 'conference12', '2019-08-29'),
      ('paper13', 'conference13', '2021-07-14'),
      ('paper14', 'conference14', '2022-12-12'),
      ('paper15', 'conference15', '2023-05-09'),
      ('paper16', 'conference16', '2021-11-23'),
      ('paper17', 'conference17', '2018-04-30'),
      ('paper18', 'conference18', '2020-03-10'),
      ('paper19', 'conference19', '2019-05-19'),
      ('paper20', 'conference20', '2022-09-21'),
      ('paper21', 'conference21', '2020-07-01'),
      ('paper22', 'conference22', '2021-08-05'),
      ('paper23', 'conference23', '2019-11-27'),
      ('paper24', 'conference24', '2022-10-14'),
      ('paper25', 'conference25', '2020-12-09'),
      ('paper26', 'conference26', '2021-03-15'),
      ('paper27', 'conference27', '2020-06-22'),
      ('paper28', 'conference28', '2023-07-18'),
      ('paper29', 'conference29', '2021-01-25'),
      ('paper30', 'conference30', '2018-05-05');
    `);

    console.log('✓ Inserted 30 research papers');
    
    await pool.query(`
      INSERT INTO author_paper (author_id, paper_id)
      VALUES
      (1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8),
      (5, 9), (5, 10), (6, 11), (6, 12), (7, 13), (7, 14), (8, 15), (8, 16),
      (9, 17), (9, 18), (10, 19), (10, 20), (11, 21), (11, 22), (12, 23), (12, 24),
      (13, 25), (13, 26), (14, 27), (14, 28), (15, 29), (15, 30),
      (1, 3), (2, 6), (3, 9), (4, 12), (5, 15), (6, 18), (7, 21), (8, 24),
      (9, 27), (10, 30), (11, 2), (12, 5), (13, 8), (14, 11), (15, 14);
    `);

    console.log('✓ Inserted into author_paper');
  } catch (error) {
    console.error(`✕ Error inserting data: ${error.message}`);
  }
};
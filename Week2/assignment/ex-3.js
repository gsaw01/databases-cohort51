// Exercise 3: Joins
// 1). Write a query that prints names of all authors and their corresponding mentors.
// 2). Write a query that prints all columns of authors and their published paper_title. 
//     If there is an author without any research_Papers, print the information of that author too.

import { pool } from './db.js';

export const runJoinQueries = async () => {
  try {
    // each author can be a mentor of another author 
    const query1 = `
      SELECT
      authors1.author_name AS author,
      authors2.author_name AS mentor
      FROM authors AS authors1 
      JOIN authors AS authors2
      ON authors1.mentor = authors2.author_id;
    `;

    const query2 = `
      SELECT
      authors.*, research_papers.paper_title
      FROM authors 
      LEFT JOIN author_paper
      ON authors.author_id = author_paper.author_id
      LEFT JOIN research_papers
      ON author_paper.paper_id = research_papers.paper_id;
    `;

    const [query1Results] = await pool.query(query1);
    console.log(`\n-------Authors and their mentors-------\n`);
    console.log(`${JSON.stringify(query1Results, null, 2)}`)

    const [query2Results] = await pool.query(query2);
    console.log(`\n-------Authors and their papers-------\n`);
    console.log(`${JSON.stringify(query2Results, null, 2)}`)
  } catch (error) {
    console.error('✕ Error running join queries:', error.message);
  }
};
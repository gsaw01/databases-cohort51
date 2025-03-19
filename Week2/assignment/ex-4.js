// Exercise 4: Aggregate Functions
// Write some queries to retrieve the following rows:
//   a). All research papers and the number of authors that wrote that paper.
//   b). Sum of the research papers published by all female authors.
//   c). Average of the h-index of all authors per university.
//   d). Sum of the research papers of the authors per university.
//   e). Minimum and maximum of the h-index of all authors per university.

import { pool } from './db.js';

export const runAggregateQueries = async () => {
  const queries = [
    {
      queryDescription: 'All research papers and the number of authors that wrote that paper',
      query: `
        SELECT
          paper_title,
          COUNT(author_id) AS author_count
        FROM author_paper 
        JOIN research_papers
        ON author_paper.paper_id = research_papers.paper_id
        GROUP BY research_papers.paper_id;
        `,
    },
    {
      queryDescription: 'Sum of the research papers published by all female authors',
      query: `
        SELECT
          SUM(paper_count)
        FROM (
          SELECT COUNT(paper_id) AS paper_count
          FROM authors 
          JOIN author_paper ON authors.author_id = author_paper.author_id 
          WHERE gender = 'Female' 
          GROUP BY authors.author_id
        ) AS subquery;
      `,
    },
    {
      queryDescription: 'Average of the h-index of all authors per university',
      query: `
        SELECT university, AVG(h_index) AS avg_h_index 
          FROM authors 
          GROUP BY university;
      `,
    },
    {
      queryDescription: 'Sum of the research papers of the authors per university',
      query: `
        SELECT university, COUNT(paper_id) AS total_papers 
          FROM authors 
          LEFT JOIN author_paper ON authors.author_id = author_paper.author_id 
          GROUP BY university;
      `,
    },
    {
      queryDescription: 'Minimum and maximum of the h-index of all authors per university',
      query: `
      SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index 
        FROM authors 
        GROUP BY university;
      `,
    },
  ];

  try {
    for (const { queryDescription, query } of queries) {
      const [results] = await pool.query(query);
      console.log(`\n-------${queryDescription}------\n`);
      console.log(results);
    }
  } catch (error) {
    console.error(`✕ Error running aggregate queries: ${error.message}`);
  }
};

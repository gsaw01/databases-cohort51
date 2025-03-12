export const worldDatabaseQueries = [
  {
    description: 'Countries with population more than 8 million',
    query: 'SELECT Name FROM country WHERE Population > 8000000;'
  },
  {
    description: `Countries with 'land' in their name`,
    query: `SELECT Name FROM country WHERE Name LIKE '%land%';`
  },
  {
    description: 'Cities with population between 500 000 and 1 million',
    query: 'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;'
  },
  {
    description: 'Countries in Europe',
    query: `SELECT Name FROM country WHERE Continent = 'Europe';`
  },
  {
    description: 'Countries sorted by surface area (descending)',
    query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC;'
  },
  {
    description: 'Names of all cities in the Netherlands',
    query: `SELECT Name FROM city WHERE CountryCode = 'NLD';`
  },
  {
    description: 'Population of Rotterdam',
    query: `SELECT Population FROM city WHERE Name = 'Rotterdam';`
  },
  {
    description: 'Top 10 countries by surface area',
    query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;'
  },
  {
    description: 'Top 10 most populated cities',
    query: 'SELECT Name FROM city ORDER BY Population DESC LIMIT 10;'
  },
  {
    description: 'Population of the world',
    query: 'SELECT SUM(Population) FROM country;'
  }
];
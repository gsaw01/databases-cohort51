import { MongoClient } from 'mongodb';
import 'dotenv/config';

const connectToDatabase = async () => {
  const client = new MongoClient(process.env.DB_URL);
  try {
    await client.connect();
    console.log('Successfully connected to database');
    return client;
  } catch (error) {
    console.error(`Failed to connect to database: ${error}`);
    throw error;
  }
};

/* 

--- Task A --- 

Write a function that will return the array of the total population (M + F over all age groups)
for a given `Country` per year.

*/

const aggregatePopulation = async (country) => {
  let client;
  try {
    client = await connectToDatabase();

    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('population');

    const result = await collection
      .aggregate([
        { $match: { Country: country } },
        {
          $group: {
            _id: '$Year',
            countPopulation: {
              $sum: { $add: ['$M', '$F'] },
            },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error(`Error during data aggregation: ${error}`);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

/* 

--- Task B --- 

Write a function that will return all the information of each continent for a given Year and Age field
but add a new field TotalPopulation that will be the addition of M and F.

*/

const aggregateContinentData = async (year, ageGroup) => {
  let client;
  try {
    client = await connectToDatabase();

    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('population');

    const result = await collection
      .aggregate([
        { $match: { Year: year, Age: ageGroup } },
        {
          $group: {
            _id: { continent: '$Continent', year: '$Year', age: '$Age' },
            totalM: { $sum: '$M' },
            totalF: { $sum: '$F' },
          },
        },
        {
          $project: {
            _id: 0,
            Continent: '$_id.continent',
            Year: '$_id.year',
            Age: '$_id.age',
            TotalPopulation: { $add: ['$totalM', '$totalF'] },
            M: '$totalM',
            F: '$totalF',
          },
        },
        { $sort: { Year: 1, Continent: 1, Age: 1 } },
      ])
      .toArray();

    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error(`Error during aggregation: ${error}`);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

const main = async () => {
  await connectToDatabase();
  await aggregatePopulation('Italy');
  await aggregateContinentData(1960, '70-74');
};

main();

import { MongoClient } from 'mongodb';
import 'dotenv/config';

export const connectToDatabase = async () => {
  const client = new MongoClient(process.env.DB_URL);
  try {
    await client.connect();
    console.log('Successfully connected to database');
    return client;
  } catch (error) {
    console.error(`Failed to connect to database: ${error.message}`);
    throw error;
  }
};

export async function setupDatabase() {
  const client = await connectToDatabase();
  const db = client.db(process.env.DB_NAME);
  const accounts = db.collection('accounts');

  try {
    await accounts.deleteMany({});

    await accounts.insertMany([
      {
        account_number: 101,
        balance: 10000,
        account_changes: [],
      },
      {
        account_number: 102,
        balance: 5000,
        account_changes: [],
      },
    ]);

    console.log('Database setup completed.');
  } catch (error) {
    console.error(`Failed to setup database: ${error}`);
    throw error;
  } finally {
    await client.close();
  }
}

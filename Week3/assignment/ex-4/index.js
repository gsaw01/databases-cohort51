const { MongoClient, ServerApiVersion } = require('mongodb');
const { seedDatabase } = require('./seedDatabase.js');
require('dotenv').config();

async function createEpisodeExercise(client, collection) {
  /**
   * We forgot to add the last episode of season 9. It has this information:
   *
   * episode: S09E13
   * title: MOUNTAIN HIDE-AWAY
   * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
   */

  // Write code that will add this to the collection!

  const episodeToInsert = {
    EPISODE: 'S09E13',
    TITLE: 'MOUNTAIN HIDE-AWAY',
    ELEMENTS: [
      'CIRRUS',
      'CLOUDS',
      'CONIFER',
      'DECIDIOUS',
      'GRASS',
      'MOUNTAIN',
      'MOUNTAINS',
      'RIVER',
      'SNOWY_MOUNTAIN',
      'TREE',
      'TREES',
    ],
  };

  try {
    const insertedEpisode = await collection.insertOne(episodeToInsert);
    console.log(
      `Created season 9 episode 13 and the document got the id ${insertedEpisode.insertedId}`
    );
  } catch (error) {
    `Failed to insert episode: ${error}`;
  }
}

async function findEpisodesExercises(client, collection) {
  /**
   * Complete the following exercises.
   * The comments indicate what to do and what the result should be!
   */

  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  try {
    const result = await collection.findOne({ episode: 'S02E02' });
    console.log(`The title of episode 2 in season 2 is ${result.title}`);
  } catch (error) {
    console.error(`Failed to find episode: ${error}`);
  }

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  try {
    const result = await collection.findOne({ title: 'BLACK RIVER' });
    console.log(
      `The season and episode number of the "BLACK RIVER" episode is ${result.episode}`
    );
  } catch (error) {
    console.error(`Failed to find episode: ${error}`);
  }

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]

  try {
    const results = await collection.find({ elements: 'CLIFF' }).toArray();
    if (results.length > 0) {
      const titlesString = results.map((result) => result.title).join(', ');
      console.log(`The episodes that Bob Ross painted a CLIFF are: ${titlesString}`);
    } else {
      console.log('No episodes found with CLIFF element.');
    }
  } catch (error) {
    console.error(`Failed to find episode: ${error}`);
  }

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]

  try {
    const results = await collection
      .find({ elements: { $all: ['CLIFF', 'LIGHTHOUSE'] } })
      .toArray();
    if (results.length > 0) {
      const titlesString = results.map((result) => result.title).join(', ');
      console.log(
        `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${titlesString}`
      );
    } else {
      console.log('No episodes found where Bob Ross painted a CLIFF and a LIGHTHOUSE.');
    }
  } catch (error) {
    console.error(`Failed to find episode: ${error}`);
  }
}

async function updateEpisodeExercises(client, collection) {
  /**
   * There are some problems in the initial data that was filled in.
   * Let's use update functions to update this information.
   *
   * Note: do NOT change the data.json file
   */

  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that

  try {
    const updateResult = await collection.updateOne(
      { episode: 'S30E13' },
      { $set: { title: 'BLUE RIDGE FALLS' } }
    );
    console.log(
      `Ran a command to update episode 13 in season 30 and it updated ${updateResult.modifiedCount} episodes`
    );
  } catch (error) {
    console.error(`Failed to update episode title: ${error}`);
  }

  // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!

  try {
    const updateResult = await collection.updateMany(
      { elements: 'BUSHES' },
      { $push: { elements: 'BUSH' } }
    );
    console.log(
      `Ran a command to update all the BUSHES to BUSH and it updated ${updateResult.modifiedCount} episodes`
    );
  } catch (error) {
    console.error(`Failed to update BUSHES to BUSH: ${error}`);
  }
}

async function deleteEpisodeExercise(client, collection) {
  /**
   * It seems an errand episode has gotten into our data.
   * This is episode 14 in season 31. Please remove it and verify that it has been removed!
   */

  try {
    const deleteResult = await collection.deleteOne({ episode: 'S31E14' });
    console.log(
      `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`
    );
  } catch (error) {
    console.error(`Failed to delete episode: ${error}`);
  }
}

async function main() {
  if (process.env.MONGODB_URI == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME);
    const collection = database.collection(process.env.COLLECTION_NAME);

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client, collection);

    // READ
    await findEpisodesExercises(client, collection);

    // UPDATE
    await updateEpisodeExercises(client, collection);

    // DELETE
    await deleteEpisodeExercise(client, collection);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/

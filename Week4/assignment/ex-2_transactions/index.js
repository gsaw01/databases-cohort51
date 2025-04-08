import { setupDatabase } from './setup.js';
import { transfer } from './transfer.js';

const makeTestTransfer = async () => {
  await setupDatabase();
  await transfer(101, 102, 1000, 'Test transfer');
};

makeTestTransfer();

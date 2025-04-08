import { connectToDatabase } from './setup.js';
import 'dotenv/config';

export async function transfer(sender, receiver, amount, remark) {
  const client = await connectToDatabase();
  const session = client.startSession();

  try {
    const db = client.db(process.env.DB_NAME);
    const accounts = db.collection('accounts');

    await session.withTransaction(async () => {
      const senderAcc = await accounts.findOne({ account_number: sender }, { session });
      const receiverAcc = await accounts.findOne(
        { account_number: receiver },
        { session }
      );

      if (!senderAcc) throw new Error('Sender account not found');
      if (!receiverAcc) throw new Error('Receiver account not found');
      if (senderAcc.balance < amount) throw new Error('Account balance is too low.');

      const now = new Date();
      const senderChangeNumber = senderAcc.account_changes.length + 1;
      const receiverChangeNumber = receiverAcc.account_changes.length + 1;

      await accounts.updateOne(
        { account_number: sender },
        {
          $inc: { balance: -amount },
          $push: {
            account_changes: {
              change_number: senderChangeNumber,
              amount: -amount,
              changed_date: now,
              remark: `${remark}`,
            },
          },
        },
        { session }
      );

      await accounts.updateOne(
        { account_number: receiver },
        {
          $inc: { balance: amount },
          $push: {
            account_changes: {
              change_number: receiverChangeNumber,
              amount: amount,
              changed_date: now,
              remark: `${remark}`,
            },
          },
        },
        { session }
      );
    });

    console.log('Transaction done.');
  } catch (error) {
    console.error(`Transaction failed: ${error.message}`);
  } finally {
    await session.endSession();
    await client.close();
  }
}

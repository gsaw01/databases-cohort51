# Exercise 2 : Transactions

Just like last week, let's solve the same transaction problem but then in MongoDB. You can use the same data as in
Week3. Note that you will need to include some libraries which means you will need to set that up as well (create
a `ex2-transactions` folder for this). You will also probably want to create an `index.js` that calls the functions we
will create to test it out, we leave the implementation of that up to you. Now let's get started, we will split our code
into multiple files again, first being the setup file:

1. Create a `setup.js` file.
2. It should clean up the `accounts` array and then fill it with some sample data. Just like last last week we want an
   account document to have an `account_number` and `balance` field. Then it should have another field
   called `account_changes` that is an array that contains the fields: `change_number, amount, changed_date, remark`.
3. It's probably best to make this a function that you can export and call

Then it is time to write our transaction function:

1. Create a `transfer.js` file that will hold our `transfer` function.
2. It should transfer money from one account to another, so it will need to know the following things: from which
   account, to which account, the amount and the remark for this transaction.
3. This should update the balances of both accounts and for each account add a change to the list. The change number
   should be incremented, so if the latest `change_number` is 30, the `change_number` for the new change should be 31.
4. Test that it works by calling the function to transfer 1000 from account number 101 to account number 102.

Submit the `setup.js` and `transfer.js` files.

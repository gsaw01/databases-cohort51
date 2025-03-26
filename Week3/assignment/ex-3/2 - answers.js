// Possible injection for ${name}: ' OR 1=1 --
// Possible injection for ${code}: ''

// Rewritten function:

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn

  const query = `SELECT Population FROM ?? WHERE Name = ? and code = ?`;
  const valuesToInsert = [Country, name, code];

  conn.query(query, valuesToInsert, function (err, result) {
    if (err) cb(err);
    if (result.length == 0) cb(new Error('Not found'));
    cb(null, result[0].name);
  });
}

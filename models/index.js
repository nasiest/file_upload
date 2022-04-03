/**
 * Query the database using the pool
 * @param {String} query - The database query to be executed
 * @param {*} params - Parameters to be used while executing the query
 * @return {Promise<*>}
 */
function query(query, params = null) {
  return new Promise(function (resolve, reject) {
    con.query(query, params, function (error, rows, field) {
      if (error) return reject(error.sqlMessage);
      resolve(rows);
    });
  });
}

module.exports = {query};
var mysql = require('mysql-await')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ancestors'
  });

async function getAll () {
    const response = await connection.awaitQuery('SELECT * FROM families;');
    return response;
}

async function getByName (name) {
    const response = await connection.awaitQuery('SELECT * FROM families WHERE name LIKE "%'+ name +'%"');
    return response;
}

async function getById (id) {
    const response = await connection.awaitQuery('SELECT * FROM families WHERE id = "'+ id +'" LIMIT 1;');
    return response;
}

module.exports.getAll = getAll;
module.exports.getByName = getByName;
module.exports.getById = getById;
var mysql = require('mysql-await')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ancestors'
  });

async function getAll () {
    const response = await connection.awaitQuery('SELECT * FROM people;');
    return response;
}

async function getByName (name) {
    const response = await connection.awaitQuery('SELECT * FROM people WHERE name LIKE "%'+ name +'%"');
    return response;
}

async function getByFamilyName (name) {
    const response = await connection.awaitQuery('SELECT b.* FROM families as a, people as b WHERE b.family = a.id AND a.family LIKE "%'+ name +'%"');
    return response;
}

async function getByFamilyId (id) {
    const response = await connection.awaitQuery('SELECT * FROM people WHERE family = "'+ id +'"');
    return response;
}

module.exports.getAll = getAll;
module.exports.getByName = getByName;
module.exports.getByFamilyId = getByFamilyId;
module.exports.getByFamilyName = getByFamilyName;
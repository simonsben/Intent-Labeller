const { Database } = require('sqlite3').verbose();
const { queries } = require('./queries');
const { error_thrower } = require('./utilities');


// Define Database handler
var database_handler = () => {
    this.db = new Database('./labelling_database.sdb');
};
database_handler.prototype.new_user = (user_type=null) => {
    this.db.run(queries.insert_user, user_type, error_thrower);
}




module.exports = {
    database_handler
};

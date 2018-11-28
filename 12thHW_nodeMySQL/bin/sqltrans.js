const mysql = require("mysql2/promise");
const sqlobj = require("./sqlobj.js");

class SQLTransaction {
    constructor(db, query) {
        return (async () => {
            try {
                let connection = await mysql.createConnection(sqlobj(db));
                this.query = await connection.execute(query);
                this.success = true;
                connection.end();
            } catch (error) {
                connection.end();
                this.success = false;
                throw new Error(error);
            };
            return this;
        })();
    };
};

module.exports = SQLTransaction;

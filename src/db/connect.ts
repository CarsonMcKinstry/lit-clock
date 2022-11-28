import knex, { Knex } from 'knex';
import path from 'path';

let connection: Knex;

export const connect = () => {
    if (!connection) {
        connection = knex({
            client: 'sqlite3',
            connection: {
                filename: path.resolve('./db/quotes.db'),
            },
            useNullAsDefault: false,
        });
    }

    return connection;
};

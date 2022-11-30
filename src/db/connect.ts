import { DBQuote } from 'components/Quote';
import fs from 'fs/promises';
import path from 'path';

let rows: DBQuote[];

export const connect = async () => {
    if (!rows) {
        const file = await fs.readFile(path.resolve('data.json'), 'utf-8');

        const json = JSON.parse(file);

        rows = json;
    }

    return rows;
};

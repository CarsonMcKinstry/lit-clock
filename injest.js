const fs = require('fs/promises');
const path = require('path');

// const {PrismaClient} = require('@prisma/client');
// const fs = require('fs/promises');
// const path = require('path');

// const prisma = new PrismaClient();

async function main() {
    const file = await fs.readFile(
        path.resolve(__dirname, 'data.csv'),
        'utf-8'
    );

    const rows = file
        .trim()
        .split('\n')
        .map((row) => {
            const [time, time_words, quote, title, author] = row.split('\t');

            return {
                time,
                time_words,
                quote,
                title,
                author,
            };
        });

    await fs.writeFile(
        path.resolve(__dirname, 'data.json'),
        JSON.stringify(rows)
    );
}

main().catch(async (e) => {
    console.error(e);
    process.exit(1);
});

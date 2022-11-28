const {PrismaClient} = require('@prisma/client');
const fs = require('fs/promises');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const file = await fs.readFile(path.resolve(__dirname, 'data.csv'), 'utf-8');

    const rows = file.trim().split('\n');

    for (const row of rows) {
        const line = row.split('\t');
        const [
            time,
            time_words,
            quote,
            title,
            author
        ] = line

        const data = {
            time,
            time_words,
            quote,
            title,
            author
        };

        const q = await prisma.quote.create({
            data
        });

        console.log(q);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await primsa.$disconnect();
        process.exit(1);
    });
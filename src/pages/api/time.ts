import {PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient();

const missingQuotes = ["It's said that we didn't have a quote for {}.",
    "Oops! Looks like it's {}, but we don't have quote for that.",
    "{}. Nuff said.",
    "It's {}.",
    "Shit! It's {}. Are you sure we aren't late for something?"]

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() > 0.5 ? -1 : 1);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const time = await prisma.quote.findMany({
        where: {
            time: req.query.t?.toString()
        }
    });

    const quote = shuffle(time)[0];

    if (quote) {
        return res.status(200).json(quote);
    }

    const replacementQuote = shuffle(missingQuotes)[0];

    const finalQuote = replacementQuote.replace("{}", req.query.t?.toString() ?? '');

    res.status(200)
        .json({
            time: req.query.t?.toString(),
            time_words: req.query.t?.toString(),
            quote: finalQuote,
            title: 'My Brain',
            author: 'Carson'
        })
}
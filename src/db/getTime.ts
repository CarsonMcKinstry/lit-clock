import { DBQuote } from 'components/Quote';
import { connect } from './connect';

const missingQuotes = [
    "It's said that we didn't have a quote for {}.",
    "Oops! Looks like it's {}, but we don't have quote for that.",
    '{}. Nuff said.',
    "It's {}.",
    "Shit! It's {}. Are you sure we aren't late for something?",
];

function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => (Math.random() > 0.5 ? -1 : 1));
}

export const getTime = async (timeToFind: string) => {
    const conn = await connect();

    const times = conn.filter(({ time }) => time === timeToFind);

    const quote = shuffle(times)[0];

    if (quote) {
        return quote;
    }

    const replacementQuote = shuffle(missingQuotes)[0];

    const finalQuote = replacementQuote.replace('{}', timeToFind);

    return {
        time: timeToFind,
        time_words: timeToFind,
        quote: finalQuote,
        title: 'My Brain',
        author: 'Carson',
    };
};

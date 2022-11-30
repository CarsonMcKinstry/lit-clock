import { Quote as Component } from './Quote';
import { DBQuote } from './types';
import { ComponentMeta } from '@storybook/react';
import './font.story.css';
import { Provider as SettingsProvider } from '../Settings';

export default {
    title: 'Quote',
    component: Component,
} as ComponentMeta<typeof Component>;

const basicQuote: DBQuote = {
    time: '00:00',
    time_words: 'midnight',
    quote: 'As midnight was striking bronze blows upon the dusky air, Dorian Gray, dressed commonly, and with a muffler wrapped round his throat, crept quietly out of his house.',
    title: 'The Picture of Dorian Gray ',
    author: 'Oscar Wilde',
};

const longQuote: DBQuote = {
    time: '12:54',
    time_words: '12:54 pm.',
    quote: "I listen to the different boats' horns, hoping to learn what kind of boat I'm hearing and what the signal means: is the boat leaving or entering the harbor; is it the ferry, or a whale-watching boat, or a fishing boat? At 5:33 pm there is a blast of two deep, resonant notes a major third apart. On another day there is the same blast at 12:54 pm. On another, exactly 8:00 am.",
    title: 'Varieties of Disturbance',
    author: 'Lydia Davis',
};

const reallyLongQuote: DBQuote = {
    time: '20:15',
    time_words: 'quarter past eight',
    quote: "Natsha: I was looking to see if there wasn't a fire. It's Shrovetide, and the servant is simply beside herself; I must look out that something doesn't happen. When I came through the dining-room yesterday midnight, there was a candle burning. I couldn't get her to tell me who had lighted it. [Puts down her candle] What's the time? Andrey: [Looks at his watch] A quarter past eight. Natasha: And Olga and Irina aren't in yet. The poor things are still at work. Olga at the teachers' council, Irina at the telegraph office...[sighs] I said to your sister this morning, \"Irina, darling, you must take care of yourself.\" But she pays no attention. Did you say it was a quarter past eight?",
    title: 'The Three Sisters',
    author: 'Anton Chekhov',
};

const Template = (args: any) => (
    <main>
        <Component {...args} />
    </main>
);

export const ShortQuote = Template.bind({});
// @ts-ignore
ShortQuote.args = basicQuote;

export const LongQuote = Template.bind({});
// @ts-ignore
LongQuote.args = longQuote;

export const ReallyLongQuote = Template.bind({});
// @ts-ignore
ReallyLongQuote.args = reallyLongQuote;

export const DarkMode = (args: any) => (
    <main>
        <SettingsProvider
            value={{
                dark_mode: true,
                updateSettings: async () => {},
            }}
        >
            <Component {...args} />
        </SettingsProvider>
    </main>
);
// @ts-ignore
DarkMode.args = basicQuote;

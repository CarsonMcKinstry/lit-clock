import { Quote as Component } from './Quote';
import { DBQuote } from './types';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Quote',
    component: Component,
} as ComponentMeta<typeof Component>;

const basicQuote: DBQuote = {
    time: '00:00',
    time_string: 'midnight',
    quote: 'As midnight was striking bronze blows upon the dusky air, Dorian Gray, dressed commonly, and with a muffler wrapped round his throat, crept quietly out of his house.',
    title: 'The Picture of Dorian Gray ',
    author: 'Oscar Wilde',
};

export const Quote = () => <Component {...basicQuote} />;

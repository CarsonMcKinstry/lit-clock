import {DBQuote} from './types';
import cn from 'classnames';

import {Roboto_Slab} from '@next/font/google';
import {useSettings} from '../Settings';

const robotoSlab = Roboto_Slab({
    weight: ['300', '500', '700', '800'],
    style: ['normal'],
    subsets: ['latin'],
});

interface QuoteProps extends DBQuote {
}

const getFontSize = (quote: string) => {
    const len = quote.length;

    if (len > 460) {
        return 'text-xl';
    }

    if (len > 320) {
        return 'text-2xl';
    }

    return 'text-3xl';
};

export const Quote = (props: QuoteProps): JSX.Element => {
    const {dark_mode} = useSettings() ?? {};
    const {time_words, quote, title, author} = props;

    const before = quote.slice(0, quote.indexOf(time_words));
    const after = quote.slice(quote.indexOf(time_words) + time_words.length);

    const leading = quote.length > 320 ? 'leading-normal' : 'leading-relaxed';
    const fontSize = getFontSize(quote);

    const textColor = dark_mode ? 'text-neutral-200' : 'text-neutral-700';
    const timeColor = dark_mode ? 'text-neutral-50' : 'text-neutral-900';
    const bgColor = dark_mode ? 'bg-neutral-800' : 'bg-neutral-100';
    const captionColor = dark_mode ? 'text-neutral-100' : 'text-neutral-800';

    return (
        <figure
            className={cn(
                'h-full w-full flex flex-col justify-between pl-8 pr-8 pt-4 pb-8 box-border',
                robotoSlab.className,
                textColor,
                bgColor
            )}
        >
            <blockquote className="pt-8">
                <p className={cn(leading, fontSize, 'font-light')}>
                    {before}
                    <span className={cn('font-bold tracking-wide', timeColor)}>
                        {time_words}
                    </span>
                    {after}
                </p>
            </blockquote>
            <figcaption className={cn('text-right font-light', captionColor)}>
                <cite className="text-2xl">{title.trim()}</cite>
                <div className="text-2xl">{author}</div>
            </figcaption>
        </figure>
    );
};

import { DBQuote } from './types';
import cn from 'classnames';

interface QuoteProps extends DBQuote {}

export const Quote = (props: QuoteProps): JSX.Element => {
    const { time_string, quote, title, author } = props;

    const [before, after] = quote.split(time_string);

    const leading = quote.length > 320 ? 'leading-normal' : 'leading-relaxed';

    return (
        <figure
            className="flex flex-col justify-between pl-8 pr-8 pt-4 pb-8 bg-neutral-100 text-neutral-700"
            style={{ width: 800, height: 480, boxSizing: 'border-box' }}
        >
            <blockquote className="pt-8">
                <p className={cn(leading, 'text-3xl font-medium')}>
                    {before}
                    <em className="font-extrabold text-neutral-900">
                        {time_string}
                    </em>
                    {after}
                </p>
            </blockquote>
            <figcaption className="text-right font-light text-neutral-800">
                <cite className="text-2xl">{title.trim()}</cite>
                <div className="text-2xl">{author}</div>
            </figcaption>
        </figure>
    );
};

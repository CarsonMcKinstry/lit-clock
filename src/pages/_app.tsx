import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Roboto_Slab } from '@next/font/google';

const robotoSlab = Roboto_Slab({
    weight: ['300', '500', '700', '800'],
    style: ['normal'],
    subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${robotoSlab.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    );
}

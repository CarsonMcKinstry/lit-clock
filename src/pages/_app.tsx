import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SettingsProvider } from '../components/Settings';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SettingsProvider>
            <main className="relative">
                <Component {...pageProps} />
            </main>
        </SettingsProvider>
    );
}

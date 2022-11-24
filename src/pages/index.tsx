import { useCurrentTime } from 'hooks/useCurrentTime';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { DBQuote, Quote } from 'components/Quote';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();
    const currentTime = useCurrentTime();
    const [rawQuote, setQuote] = useState<DBQuote | null>(null);

    useEffect(() => {
        if (!rawQuote || (!!rawQuote && rawQuote.time !== currentTime)) {
            invoke<DBQuote>('get_time', { time: currentTime })
                .then((q) => {
                    setQuote(q);
                })
                .catch(console.error);
        }
    }, [rawQuote, currentTime]);

    return (
        <>
            <button
                className="absolute top-0 right-0 h-16 w-16"
                onClick={() => router.push('/settings')}
            />
            {rawQuote && <Quote {...rawQuote} />}
        </>
    );
}

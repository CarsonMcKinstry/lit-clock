import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { Provider } from './context';
import { Settings } from './types';

type ActualSettings = Omit<Settings, 'updateSettings'>;

const getSettings = () => {
    if (typeof window !== 'undefined') {
        const rawSettings = localStorage.getItem("settings");

        return rawSettings ? JSON.parse(rawSettings) : {
            dark_mode: false
        }
    }

    return {
        dark_mode: false
    }
}

const setSettings = (newSettings: ActualSettings) => {
    if (typeof window !== 'undefined') {
        const rawSettings = JSON.stringify(newSettings);

        localStorage.setItem("settings", rawSettings);
    }
}

export const SettingsProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element | null => {
    const [settings, setSettingsState] = useState<null | ActualSettings>(getSettings);

    const mounted = useRef<boolean>(false);

    useEffect(() => {
        if (mounted.current && settings) {
            setSettings(settings);
        } else {
            mounted.current = true;
        }
    }, [settings]);

    const updateSettings = (settings: ActualSettings) => {
        setSettingsState(settings);
    };

    if (!settings) return null;

    return (
        <Provider
            value={{
                ...settings,
                updateSettings,
            }}
        >
            {children}
        </Provider>
    );
};

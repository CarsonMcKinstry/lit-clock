import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { Provider } from './context';
import { Settings } from './types';

type ActualSettings = Omit<Settings, 'updateSettings'>;

const getSettings = () => {
    const rawSettings = localStorage.getItem("settings");

    return rawSettings ? JSON.parse(rawSettings) : {
        dark_mode: false
    }
}

const setSettings = (newSettings: ActualSettings) => {
    const rawSettings = JSON.stringify(newSettings);

    localStorage.setItem("settings", rawSettings);
}

export const SettingsProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element | null => {
    const [settings, setSettingsState] = useState<null | ActualSettings>(getSettings);
    const [errors, setError] = useState<Error | null>();

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

    if (errors) {
        return (
            <div>
                Something went wrong. Carson should probably look at the
                settings.
            </div>
        );
    }

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

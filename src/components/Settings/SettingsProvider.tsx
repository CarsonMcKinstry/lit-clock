import { ReactNode, useEffect, useState } from 'react';
import { Provider } from './context';
import { Settings } from './types';

type ActualSettings = Omit<Settings, 'updateSettings'>;

export const SettingsProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element | null => {
    const [settings, setSettings] = useState<null | ActualSettings>();
    const [errors, setError] = useState<Error | null>();

    useEffect(() => {
        fetch('/api/settings')
            .then((res) => res.json())
            .then(setSettings);
    }, []);

    const updateSettings = async (settings: ActualSettings) => {
        fetch('/api/settings', {
            method: 'POST',
            body: JSON.stringify(settings),
        })
            .then((res) => res.json())
            .then(setSettings)
            .catch(console.error);
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

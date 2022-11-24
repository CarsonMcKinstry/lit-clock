import { ReactNode, useEffect, useState } from 'react';
import { Provider } from './context';
import { Settings } from './types';
import { invoke } from '@tauri-apps/api/tauri';

type ActualSettings = Omit<Settings, 'updateSettings'>;

export const SettingsProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element | null => {
    const [settings, setSettings] = useState<null | ActualSettings>(null);
    const [errors, setError] = useState<Error | null>();

    useEffect(() => {
        invoke<ActualSettings>('get_settings')
            .then((settings) => {
                console.log(settings);
                setSettings(settings);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    }, []);

    const updateSettings = async (settings: ActualSettings) => {
        console.log(settings);
        invoke<ActualSettings>('update_settings', {
            settings,
        })
            .then((s) => {
                console.log(s);
                setSettings(s);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
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

import { ReactNode, useEffect, useState } from 'react';
import { Provider } from './context';
import { Settings } from './types';
import { invoke } from '@tauri-apps/api/tauri';

export const SettingsProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element | null => {
    const [settings, setSettings] = useState<null | Pick<
        Settings,
        'dark_mode'
    >>(null);
    const [errors, setError] = useState<Error | null>();

    useEffect(() => {
        invoke<Pick<Settings, 'dark_mode'>>('get_settings')
            .then((settings) => {
                setSettings(settings);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    const toggleDarkMode = async () => {};

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
                toggleDarkMode,
            }}
        >
            {children}
        </Provider>
    );
};

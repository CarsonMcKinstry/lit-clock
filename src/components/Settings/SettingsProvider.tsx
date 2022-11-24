import {ReactNode, useEffect, useState} from "react";
import {Provider} from './context';
import {Settings} from "./types";

export const SettingsProvider = ({children}: { children: ReactNode }): ReactNode => {

    const [settings, setSettings] = useState<null | Settings>(null);

    useEffect(() => {
        // get the settings here
    }, []);

    if (!settings) return null;

    return (
        <Provider value={settings}>
            {children}
        </Provider>
    )
}
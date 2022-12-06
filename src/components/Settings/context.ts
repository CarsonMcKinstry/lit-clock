import { createContext, useContext } from 'react';
import { Settings } from './types';

const settingsContext = createContext<Settings | null>({
    dark_mode: false,
    updateSettings: () => {},
});

const { Provider } = settingsContext;

export { Provider };

export const useSettings = () => useContext(settingsContext);

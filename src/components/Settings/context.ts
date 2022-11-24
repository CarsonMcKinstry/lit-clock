import { createContext, useContext } from 'react';
import { Settings } from './types';

const settingsContext = createContext<Settings | null>(null);

const { Provider } = settingsContext;

export { Provider };

export const useSettings = () => useContext(settingsContext);

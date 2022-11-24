import { SettingsProvider } from '../components/Settings';
import { SettingsPage } from '../components/Settings/Page';

const Settings = () => {
    return (
        <SettingsProvider>
            <SettingsPage />
        </SettingsProvider>
    );
};

export default Settings;

import { SettingsPage as Component } from './Page';
import { Provider } from './context';

export default {
    title: 'Page/Settings',
    component: Component,
};

const Template = (args: any) => {
    const updateSettings = async () => {};

    return (
        <main>
            <Provider value={{ dark_mode: false, updateSettings }}>
                <Component />
            </Provider>
        </main>
    );
};

export const SettingsPage = Template.bind({});

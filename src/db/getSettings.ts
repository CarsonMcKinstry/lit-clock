import { connect } from './connect';
import { Settings } from 'components/Settings';

export const getSettings = async () => {
    const conn = await connect();

    const [settings] = await conn
        .table<Settings>('settings')
        .where({ id: '1' })
        .select('*');

    if (!settings) {
        const [settings] = await conn
            .insert(
                [
                    {
                        id: '1',
                        dark_mode: true,
                    },
                ],
                ['id', 'dark_mode']
            )
            .into('settings');

        return settings;
    }

    return settings;
};

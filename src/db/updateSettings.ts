import { Settings } from 'components/Settings';
import { connect } from './connect';

export const updateSettings = async ({ dark_mode }: { dark_mode: boolean }) => {
    const conn = await connect();

    const [settings] = await conn
        .table<Settings>('settings')
        .where({ id: '1' })
        .update(
            {
                dark_mode,
            },
            ['id', 'dark_mode']
        );

    return settings;
};

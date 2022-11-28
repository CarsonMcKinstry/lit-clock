import { getSettings, updateSettings } from 'db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET': {
            const settings = await getSettings();

            return res.status(200).json(settings);
        }
        case 'POST': {
            const nextSettings = JSON.parse(req.body);

            const settings = await updateSettings(nextSettings);

            return res.status(200).json(settings);
        }
    }
}

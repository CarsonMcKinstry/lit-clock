import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getTime } from 'db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const quote = await getTime(req.query.t?.toString() ?? '');

    return res.status(200).json(quote);
}

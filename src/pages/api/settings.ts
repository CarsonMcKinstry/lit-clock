import {PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            const settings = await prisma.settings.findUnique({
                where: {
                    id: '1'
                }
            });

            if (!settings) {
                const actualSettings = await prisma.settings.create({
                    data: {
                        id: '1',
                        dark_mode: false
                    }
                });

                return res.status(200).json(actualSettings);
            }

            return res.status(200).json(settings);
        }
        case 'POST': {
            const nextSettings = JSON.parse(req.body);
            const settings = await prisma.settings.upsert({
                create: {
                    id: '1',
                    dark_mode: nextSettings.dark_mode
                },
                update: {
                    dark_mode: nextSettings.dark_mode
                },
                where: {
                    id: '1'
                }
            });
            return res.status(200).json(settings)
        }
    }
}
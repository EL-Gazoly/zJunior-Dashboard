import { prisma } from "@/lib";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { newJob } = req.body;

    console.log('this is new job', newJob);

    try {
        const newJob = await prisma.crawledOpportunity.create({
            data: {
            id : req.body.id,
            title: req.body.title,
            company: req.body.company,
            description: req.body.description,
            link: req.body.link,
            level: req.body.type,
            role: req.body.role,
            logo: req.body.logo,
            skills: req.body.skills,
            },
        });
        console.log({ newJob });
        res.status(200).json({ message: 'Job created successfully' });
        }
        catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


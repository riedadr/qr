// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const query = req.query;
	const { link, id } = query;

	let entry;

	if (link) {
		entry = await prisma.thing.findFirst({
			where: {
				link: link?.toString(),
			},
		});
	} else {
		entry = await prisma.thing.findFirst({
			where: {
				id: id?.toString(),
			},
		});
	}

	res.status(200).json({ entry });
}

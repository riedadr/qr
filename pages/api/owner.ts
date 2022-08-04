// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const query = req.query;
	const { id, get } = query;
	let auswahl = get ? get.toString().split(",") : [];

	let entry;

	entry = await prisma.owner.findFirst({
		where: {
			id: id?.toString(),
		},
		select: {
			vorname: auswahl.includes("vorname"),
			nachname: auswahl.includes("nachname"),
			//role: auswahl.includes("role"),
			//username: auswahl.includes("username"),
			//password: auswahl.includes("password"),
			email: auswahl.includes("email"),
			mobile: auswahl.includes("mobile"),
			phone: auswahl.includes("phone"),
		}
	});

	res.status(200).json({ entry });
}

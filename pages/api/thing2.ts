import { connectToDatabase } from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const query = req.query;
	const { link, id } = query;
	const { db } = await connectToDatabase();

	let thing;
	if (link) {
		thing = await db
			.collection("thing")
			.find({ link: link })
			.limit(20)
			.toArray();
	} else {
		thing = await db
			.collection("thing")
			.find({ id: id })
			.limit(20)
			.toArray();
	}

	res.json(thing);
}

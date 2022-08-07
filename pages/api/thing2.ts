import { connectToDatabase } from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const ObjectId = require("mongodb").ObjectID;
	const query = req.query;
	const { link, id } = query;
	const { db } = await connectToDatabase();

	let thing;
	if (link) {
		thing = await db.collection("thing").findOne({ link: link });
	} else {
		thing = await db.collection("thing").findOne({ _id: ObjectId(id) });
	}

	res.json(thing);
}
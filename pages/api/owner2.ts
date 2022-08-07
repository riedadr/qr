// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Collection } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const ObjectId = require("mongodb").ObjectID;

	const query = req.query;
	const { id, get } = query;
	const { db } = await connectToDatabase();
	let auswahl = get ? get.toString().split(",") : [];

	/*
	let entry;

	entry = await prisma.owner.findFirst({
		where: {
			id: id?.toString(),
		},
		select: {
			firstname: auswahl.includes("firstname"),
			lastname: auswahl.includes("lastname"),
			//role: auswahl.includes("role"),
			//username: auswahl.includes("username"),
			//password: auswahl.includes("password"),
			email: auswahl.includes("email"),
			mobile: auswahl.includes("mobile"),
			phone: auswahl.includes("phone"),
		}
	});
    */

	console.log(id);
	/*
	const owner = await db
		.collection("owner")
		.find(
			{ _id: ObjectId(id) },
			{
				firstname: 1,
				role: 0,
			}
		)
		.limit(20)
		.toArray();
	*/

	const owner: Collection = db.collection("owner");

	let select = {};
	auswahl.forEach((item) => {
		console.log(item);
		select[item] = 1;
	});

	console.log(select);

	const entry = await owner
		.findOne({ _id: ObjectId(id) }, {projection: select})

	console.log(entry);

	res.status(200).json(entry);
}

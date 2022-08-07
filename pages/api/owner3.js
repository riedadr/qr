// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
	req,
	res
) {
	const ObjectId = require("mongodb").ObjectID;

	const query = req.query;
	const { id, get } = query;
	const { db } = await connectToDatabase();
	let auswahl = get ? get.toString().split(",") : [];

	const owner = db.collection("owner");
	
	let select = {};
	auswahl.forEach(element => {
		select[element] = 1;
	});

	const entry = await owner.findOne(
		{ _id: ObjectId(id) },
		{ projection: select }
	);

	console.log(entry);

	res.status(200).json(entry);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
    const ObjectId = require('mongodb').ObjectID;
    
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
    
    const owner = await db
    .collection("owner")
    .find({_id: ObjectId("62eb79e6bde5c0654de27944")})
    .limit(20)
    .toArray();

    console.log(owner);
    

	res.status(200).json(owner);
}

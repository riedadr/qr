import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import prisma from "../prisma/client";
import type { thing as thingType } from "@prisma/client";

export async function getServerSideProps() {
	const foundThings = await prisma.thing.findMany({
        where: { 
            type: {in: ["mobile", "car"]} 
        },
    });
    
	return {
		props: {foundThings},
	};
}

export default function Prisma(props: any) {   
	const [things, setThings] = useState<Array<thingType>>(props.foundThings);

	async function getThings() {
		console.log("things suchen");

		//setThings(foundThings);
	}
	return (
		<>
			<h1>Prisma</h1>
            <p>Things</p>
            <ul>
                {things.map((item, index) => {
                    return (
                        <li key={index}>{item.id}</li>
                    )
                })}
            </ul>
		</>
	);
}

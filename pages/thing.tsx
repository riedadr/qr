import React, { ReactElement, useEffect, useState } from "react";
import { Card, Grid, Text, Link, Loading, Avatar } from "@nextui-org/react";
import {
	IconCar,
	IconDeviceDesktop,
	IconDeviceLaptop,
	IconDeviceMobile,
	IconDevices,
	IconDeviceTablet,
} from "@tabler/icons";
import { useRouter } from "next/router";
import Shell from "../components/Shell";
import InfoThing from "../components/InfoThing";

export default function Thing() {
	const router = useRouter();
	const { id, link } = router.query;

	return (
		<>
			<Shell title={"/thing/" + (link ? link : id)}>
				<main>
					<h1>Thing</h1>
					<div className="flex justify-center items-center">
						<InfoThing link={link} ident={id} />
					</div>
				</main>
			</Shell>
		</>
	);
}

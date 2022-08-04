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
import { owner } from "@prisma/client";

export default function Thing() {
	const [thing, setThing] = useState(null);
	const router = useRouter();
	const { id, link } = router.query;

	useEffect(() => {
		if (link) {
			fetch(`/api/thing?link=${link}`)
				.then((res) => res.json())
				.then((data) => {
					setThing(data.entry);
				});
		} else if (id) {
			fetch(`/api/thing?id=${id}`)
				.then((res) => res.json())
				.then((data) => {
					setThing(data.entry);
				});
		}
	}, [id, link]);

	return (
		<>
			<h1>Thing</h1>
			<div className="flex justify-center items-center">
				<Info data={thing} />
			</div>
		</>
	);
}

function Info(props: any) {
	const data = props.data;

	if (data) {
		return (
			<Card css={{ p: "$6", mw: "400px" }}>
				<Card.Header>
					<Avatar
						icon={
							<Icon
								type={data.type}
								fill="currentColor"
								size={60}
							/>
						}
					/>

					<Grid.Container css={{ pl: "$8" }}>
						<Grid xs={12}>
							<Text h4 css={{ lineHeight: "$xs" }}>
								{data.name}
							</Text>
						</Grid>
						<Grid xs={12}>
							<Text css={{ color: "$accents8" }}>
								{data.brand} | {data.model}
							</Text>
						</Grid>
					</Grid.Container>
				</Card.Header>
				<Card.Body css={{ py: "$2" }}>
					<Contact owner={data.owner} visible={data.visible} />
				</Card.Body>
				<Card.Footer>
					<Link
						icon
						color="primary"
						target="_blank"
						href="https://github.com/nextui-org/nextui"
					>
						Visit source code on GitHub.
					</Link>
				</Card.Footer>
			</Card>
		);
	} else
		return (
			<Card css={{ p: "$6", mw: "400px" }}>
				<Loading />
			</Card>
		);
}

function Icon(props: any) {
	switch (props.type) {
		case "mobile":
			return <IconDeviceMobile size={32} />;
		case "tablet":
			return <IconDeviceTablet size={32} />;
		case "notebook":
			return <IconDeviceLaptop size={32} />;
		case "pc":
			return <IconDeviceDesktop size={32} />;
		case "car":
			return <IconCar size={32} />;
		default:
			return <IconDevices size={32} />;
	}
}

function Contact(props: any) {
	const [contact, setContact] = useState<owner | any>();

	useEffect(() => {
		fetch(`/api/owner?id=${props.owner}&get=${props.visible}`)
			.then((res) => res.json())
			.then((data) => {
				setContact(data.entry);
			});
	}, [props.owner, props.visible]);

	let elements = new Array<ReactElement>();
	for (const key in contact) {
		const value = contact[key];
		elements.push(
			<li key={key}>
				{key}: <code>{value}</code>
			</li>
		);
	}

	if (contact) return <ul>{elements}</ul>;
	else return <Loading />;
}

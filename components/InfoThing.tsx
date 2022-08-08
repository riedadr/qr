import React, { ReactElement, useEffect, useState } from "react";
import {
	Card,
	Grid,
	Text,
	Link,
	Loading,
	Avatar,
	Table,
	Button,
} from "@nextui-org/react";
import {
	IconCar,
	IconDeviceDesktop,
	IconDeviceLaptop,
	IconDeviceMobile,
	IconDevices,
	IconDeviceTablet,
	IconMail,
	IconPhone,
} from "@tabler/icons";
import { useRouter } from "next/router";

interface Thing {
	id: string;
	link: string;
	brand: string;
	name: string;
	model: string;
	type: string;
	owner: string;
	visible: string;
	data: JSON;
}

export default function InfoThing(props: any) {
	const [thing, setThing] = useState<Thing>();
	const id = props.ident;
	const link = props.link;

	useEffect(() => {
		if (link) {
			fetch(`/api/thing2?link=${link}`)
				.then((res) => res.json())
				.then((data) => {
					setThing(data);
				});
		} else if (id) {
			fetch(`/api/thing2?id=${id}`)
				.then((res) => res.json())
				.then((data) => {
					setThing(data);
				});
		}
	}, [id, link]);

	if (thing) {
		return (
			<Card css={{ p: "$6", mw: "600px" }}>
				<Card.Header>
					<Avatar
						icon={
							<Icon
								type={thing.type}
								fill="currentColor"
								size={60}
							/>
						}
					/>

					<Grid.Container css={{ pl: "$8" }}>
						<Grid xs={12}>
							<Text h4 css={{ lineHeight: "$xs" }}>
								{thing.name}
							</Text>
						</Grid>
						<Grid xs={12}>
							<Text css={{ color: "$accents8" }}>
								{thing.brand} | {thing.model}
							</Text>
						</Grid>
					</Grid.Container>
				</Card.Header>
				<Content thing={thing} />
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

function Content(props: any) {
	const thing = props.thing;
	const [contact, setContact] = useState<any>();

	useEffect(() => {
		fetch(`/api/owner3?id=${thing.owner}&get=${thing.visible}`)
			.then((res) => res.json())
			.then((data) => {
				setContact(data);
			});
	}, [thing.owner, thing.visible]);

	let elements = new Array<ReactElement>();
	for (const key in thing.data) {
		const value = thing.data[key];
		if (key !== "_id") {
			elements.push(
				<li key={key}>
					{key}: <code>{value}</code>
				</li>
			);
		}
	}

	return (
		<>
			<Card.Body
				className="flex flex-row justify-between"
				css={{ py: "$2" }}
			>
				{thing.data ? <Data data={thing.data} /> : <Loading />}
				{contact ? <Contact contact={contact} /> : <Loading />}
			</Card.Body>
			<Card.Footer>
				<Buttons contact={contact} />
			</Card.Footer>
		</>
	);
}

function Data(props: any) {
	const d = props.data;

	let elements = new Array<ReactElement>();
	for (const key in d) {
		const value = d[key];
		if (key !== "_id") {
			elements.push(
				<Table.Row key={key}>
					<Table.Cell>{key}</Table.Cell>
					<Table.Cell><code>{value}</code></Table.Cell>
				</Table.Row>
			);
		}
	}

	if (d)
		return (
			<Table compact shadow={false} aria-label="additional data">
				<Table.Header>
					<Table.Column>Data</Table.Column>
					<Table.Column> </Table.Column>
				</Table.Header>
				<Table.Body>{elements}</Table.Body>
			</Table>
		);
	else return <Loading />;
}

function Contact(props: any) {
	const c = props.contact;

	if (c)
		return (
			<Table compact shadow={false} aria-label="contact details">
				<Table.Header>
					<Table.Column>Contact</Table.Column>
					<Table.Column> </Table.Column>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>Name</Table.Cell>
						<Table.Cell>
							<code>
								{c.firstname && c.lastname
									? c.firstname + " " + c.lastname
									: "-"}
							</code>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>E-Mail</Table.Cell>
						<Table.Cell>
							<code>{c.email ? c.email : "-"}</code>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Mobile</Table.Cell>
						<Table.Cell>
							<code>{c.mobile ? c.mobile : "-"}</code>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>Phone</Table.Cell>
						<Table.Cell>
							<code>{c.phone ? c.phone : "-"}</code>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
		);
	else return <Loading />;
}

function Buttons(props: any) {
	let contact = props.contact;
	const router = useRouter();

	const pressEmail = () => {
		router.push(`mailto:${contact.email}`);
	};
	const pressMobile = () => {
		router.push(`tel:${contact.mobile}`);
	};
	const pressPhone = () => {
		router.push(`tel:${contact.phone}`);
	};

	return (
		<div className="w-full flex flex-row justify-between">
			<Button
				auto
				color="warning"
				disabled={!(contact && contact.email)}
				icon={<IconMail />}
				onPress={pressEmail}
			>
				{contact ? "E-Mail" : <Loading />}
			</Button>
			<Button
				auto
				color="success"
				disabled={!(contact && contact.mobile)}
				icon={<IconDeviceMobile />}
				onPress={pressMobile}
			>
				{contact ? "Mobile" : <Loading />}
			</Button>
			<Button
				auto
				color="error"
				disabled={!(contact && contact.phone)}
				icon={<IconPhone />}
				onPress={pressPhone}
			>
				{contact ? "Phone" : <Loading />}
			</Button>
		</div>
	);
}

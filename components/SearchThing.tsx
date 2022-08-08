import { Button, Card, Dropdown, Input } from "@nextui-org/react";
import { IconHash, IconLink, IconSearch } from "@tabler/icons";
import { useRouter } from "next/router";
import React, { useState, useRef, FormEvent } from "react";

export default function SearchThing(props: any) {
	const [selected, setSelected] = React.useState(new Set(["link"]));
	const query = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

	const selectedValue = React.useMemo(
		() => Array.from(selected).join(", ").replaceAll("_", " "),
		[selected]
	);

	const checkInput = () => {
		let type = query.current?.value;

		if (type === "id=") {
			console.log("id");
			setSelected(new Set(["id"]));
			//@ts-ignore
			query.current.value = "";
		} else if (type === "link=") {
			console.log("link");
			setSelected(new Set(["link"]));
			//@ts-ignore
			query.current.value = "";
		}
	};

	const submit = (e: FormEvent) => {
		e.preventDefault();
		search();
	};

	const search = () => {
		const t = selectedValue;
		const q = query.current?.value;

		const param = `${t}=${q}`;
        router.push("/thing?" + param)
    };

	return (
		<>
			<Card css={{mw: "800px"}}>
				<Card.Body>
					<form
						onSubmit={submit}
						className="flex flex-row justify-between gap-4"
					>
						<Dropdown>
							<Dropdown.Button flat>
								{selectedValue}
							</Dropdown.Button>
							<Dropdown.Menu
								aria-label="Static Actions"
								disallowEmptySelection
								selectionMode="single"
								selectedKeys={selected}
								//@ts-ignore
								onSelectionChange={setSelected}
							>
								<Dropdown.Item key="link" icon={<IconLink />}>
									Link
								</Dropdown.Item>
								<Dropdown.Item key="id" icon={<IconHash />}>
									ID
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>

						<Input
							width="100%"
							aria-label="Search query"
							name={selectedValue}
							bordered
							ref={query}
							placeholder={"enter " + selectedValue}
							onChange={checkInput}
						/>

						<Button auto color="success" onPress={search}>
							<IconSearch />
						</Button>
					</form>
				</Card.Body>
			</Card>
		</>
	);
}

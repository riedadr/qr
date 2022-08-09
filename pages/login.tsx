import { Button, Card, Input, Link, Text } from "@nextui-org/react";
import React, { FormEvent, useRef, useState } from "react";
import Shell from "../components/Shell";
import { useUser } from "../contexts/user";

export default function Login() {
	const { setUser } = useUser();
	const userRef = useRef<HTMLInputElement | null>(null);
	const passRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState<String>();

	const goBack = () => {
		window.history.go(-1);
	}

	const submit = async (e: FormEvent) => {
		e.preventDefault();

		const user = userRef.current?.value;
		const pass = passRef.current?.value;

		const bcrypt = require("bcryptjs");

		/* generate hash
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(pass, salt);
		console.log(hash);
		*/

		fetch(`/api/owner3?user=${user}&get=password,role`)
			.then((res) => res.json())
			.then((data) => {
				let auth = bcrypt.compareSync(pass, data.password)
				if (auth) {
					console.log("korrekt");
					setUser(user, data.role);
					setError("");
				} else setError("username or password wrong");
			})
			.catch((err) => {
				console.error(err);
				setError("an error occured; details in log");
			});
	};

	return (
		<>
			<Shell title="/login">
				<main className="h-full flex justify-center items-center">
					<Card css={{ mw: "500px" }}>
						<Card.Header className="flex flex-col">
							<h2 className="mb-0">Login</h2>
							<Text color="error">{error}</Text>
						</Card.Header>
						<Card.Body>
							<form onSubmit={submit}>
								<div className="grid gap-4 mb-12">
									<Input
										ref={userRef}
										underlined
										label="username"
										name="username"
										placeholder="username"
									/>
									<Input.Password
										ref={passRef}
										underlined
										label="password"
										name="password"
										type="password"
										placeholder="password"
									/>
								</div>
								<div className="flex flex-row justify-between items-center gap-2">
									<Button flat onPress={goBack} color="error">
										Cancel
									</Button>
									<Button type="submit" color="success">
										Login
									</Button>
								</div>
							</form>
						</Card.Body>
					</Card>
				</main>
			</Shell>
		</>
	);
}

import { Button, Card, Input, Link, Text } from "@nextui-org/react";
import React, { FormEvent, useRef, useState } from "react";
import Shell from "../components/Shell";
import { useUser } from "../contexts/user";

export default function Login() {
	const { setUser } = useUser();
	const userRef = useRef<HTMLInputElement | null>(null);
	const passRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState<String>();

	const submit = (e: FormEvent) => {
		e.preventDefault();

		const user = userRef.current?.value;
		const pass = passRef.current?.value;

		fetch(`/api/owner3?user=${user}&get=password`)
			.then((res) => res.json())
			.then((data) => {
				if (data.password === pass) {
					console.log("korrekt");
					setUser(user);
					setError("");
				} else setError("user or password wrong");
			})
			.catch((err) => {
				console.error(err);
				setError("an error occured");
			});
	};

	return (
		<>
			<Shell title="login">
				<main className="flex justify-center items-center">
					<Card css={{ mw: "500px" }}>
						<Card.Header>
							<h2 className="mb-0">Login</h2>
						</Card.Header>
						<Card.Body>
							<Text color="error">{error}</Text>
							<form onSubmit={submit}>
								<div className="grid gap-4 mb-4">
									<Input
										ref={userRef}
										underlined
										label="username"
										name="username"
										placeholder="username"
									/>
									<Input
										ref={passRef}
										underlined
										label="password"
										name="password"
										type="password"
										placeholder="password"
									/>
								</div>
								<div className="flex flex-row justify-between items-center gap-2 mt-4">
									<Link href="/" color="error">
										Cancel
									</Link>
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

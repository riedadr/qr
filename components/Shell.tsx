import { Button, Link, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { useUser } from "../contexts/user";
import styles from "../styles/Shell.module.scss";
import ThemeSwitch from "./ThemeSwitch";

export default function Shell(props: any) {
	const { currentUser, logOut } = useUser();
	const router = useRouter();
	return (
		<div className={styles.shell}>
			<header>
				<div className="flex flex-start items-baseline gap-2">
					<h1>QR</h1>
					<h2>{props.title}</h2>
				</div>
				<ThemeSwitch />
			</header>
			<div className={styles.content}>{props.children}</div>
			<footer className={styles.footer}>
				{currentUser && (
					<>
						<Button
							auto
							size="sm"
							color="error"
							onPress={() => {
								logOut();
								router.push("/");
							}}
						>
							Log Out
						</Button>
						<Text
							color={
								currentUser.role === "admin"
									? "error"
									: "primary"
							}
						>
							{currentUser.user}
						</Text>
					</>
				)}
				{!currentUser && (
					<>
						<Link color="secondary" href="/login">
							Log In
						</Link>
					</>
				)}
			</footer>
		</div>
	);
}

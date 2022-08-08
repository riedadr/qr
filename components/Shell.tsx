import React from "react";
import styles from "../styles/Shell.module.scss";
import ThemeSwitch from "./ThemeSwitch";

export default function Shell(props: any) {
	return (
		<div className={styles.shell}>
			<header>
				<div className="flex flex-start items-baseline gap-2">
					<h1>QR</h1>
					<h2>{props.title}</h2>
				</div>
				<ThemeSwitch />
			</header>
			{props.children}
		</div>
	);
}

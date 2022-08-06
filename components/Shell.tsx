import React from "react";
import styles from "../styles/Shell.module.scss";
import ThemeSwitch from "./ThemeSwitch";

export default function Shell(props: any) {
	return (
		<div className={styles.shell}>
			<header>
				<h1>QR</h1><ThemeSwitch />
			</header>
			<main>{props.children}</main>
		</div>
	);
}

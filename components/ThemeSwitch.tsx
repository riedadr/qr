import React, { useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";

export default function ThemeSwitch() {
    const { setTheme } = useNextTheme();
	const { isDark } = useTheme();

	return (
		<Switch
			checked={isDark}
			onChange={(e) => {
				setTheme(e.target.checked ? "dark" : "light");
				document.body.className = e.target.checked ? "dark" : "light";
			}}
		/>
	);
}

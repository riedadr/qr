import React, { useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";

export default function ThemeSwitch() {
    const { setTheme } = useNextTheme();
	const { isDark, type } = useTheme();

    //set theme as body class for tailwindcss
    useEffect(() => {
		document.body.className = type;
	}, [type]);

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

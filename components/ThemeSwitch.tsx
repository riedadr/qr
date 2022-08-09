import React, { useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";
import { IconSun, IconMoon } from "@tabler/icons";

export default function ThemeSwitch() {
	const { setTheme } = useNextTheme();
	const { isDark } = useTheme();

	return (
		<Switch
			color="secondary"
			checked={isDark}
			iconOn={<IconSun />}
			iconOff={<IconMoon />}
			onChange={(e) => {
				setTheme(e.target.checked ? "dark" : "light");
				document.body.className = e.target.checked ? "dark" : "light";
			}}
		/>
	);
}

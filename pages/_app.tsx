import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UserProvider } from "./../contexts/user";

const lightTheme = createTheme({
	type: "light",
});
const darkTheme = createTheme({
	type: "dark",
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NextThemesProvider
			defaultTheme="system"
			attribute="class"
			value={{
				light: lightTheme.className,
				dark: darkTheme.className,
			}}
		>
			<NextUIProvider>
				<UserProvider>
					<Component {...pageProps} />
				</UserProvider>
			</NextUIProvider>
		</NextThemesProvider>
	);
}

export default MyApp;

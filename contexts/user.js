import { useTheme } from "@nextui-org/react";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function useUser() {
	return useContext(UserContext);
}

export function UserProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);

	//set theme as body class for tailwindcss
	const { type } = useTheme();

	function setUser(user) {
		localStorage.user = user;
		setCurrentUser(user);
	}

	function logOut() {
		localStorage.removeItem("user");
		setCurrentUser(null);
	}

	useEffect(() => {
		//set theme as body class for tailwindcss
		document.body.className = type;

		if (localStorage.user) setCurrentUser(localStorage.user);
	}, [type]);

	const value = {
		currentUser,
		logOut,
		setUser,
	};

	return (
		<div>
			<UserContext.Provider value={value}>
				{children}
			</UserContext.Provider>
		</div>
	);
}
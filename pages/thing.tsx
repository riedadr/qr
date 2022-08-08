import React from "react";
import { useRouter } from "next/router";
import Shell from "../components/Shell";
import InfoThing from "../components/InfoThing";

export default function Thing() {
	const router = useRouter();
	const { id, link } = router.query;

	return (
		<>
			<Shell title={"/thing/" + (link ? link : id)}>
				<main>
					<h2>Result for &quot;{link ? link : id}&quot;:</h2>
					<div className="flex justify-center items-center">
						<InfoThing link={link} ident={id} />
					</div>
				</main>
			</Shell>
		</>
	);
}

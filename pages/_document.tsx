import React, { useEffect } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";

function MyDocument() {
	

	return (
		<Html lang="de">
			<Head>{CssBaseline.flush()}</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

MyDocument.getInitialProps = async (ctx: any) => {
	const initialProps = await Document.getInitialProps(ctx);
	return {
		...initialProps,
		styles: React.Children.toArray([initialProps.styles]),
	};
};

export default MyDocument;

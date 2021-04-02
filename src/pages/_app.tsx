import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/globals.css";

import { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import createCache from "@emotion/cache";
import theme from "../utils/theme";
import { useEffect } from "react";

export const cache = createCache({ key: "css", prepend: true });

export default function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<CacheProvider value={cache}>
			<Head>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
}

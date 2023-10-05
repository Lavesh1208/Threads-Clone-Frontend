import {
	ChakraProvider,
	ColorModeScript,
	ThemeConfig,
	extendTheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import store from "./store/store.ts";

const styles = {
	global: (props: any) => ({
		body: {
			color: mode("gray.800", "whiteAlpha.900")(props),
			bg: mode("gray.100", "#101010")(props),
		},
	}),
};

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};

const colors = {
	gray: {
		light: "#616161",
		dark: "#1e1e1e",
	},
};

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<App />
				</ChakraProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

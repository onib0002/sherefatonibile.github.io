/** @jsxImportSource theme-ui */

import { ThemeProvider } from 'theme-ui';
import theme from '../styles/theme';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { DataProvider } from '../pages/people/dataContextHook';
function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<DataProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</DataProvider>
		</ThemeProvider>
	);
}

export default MyApp;

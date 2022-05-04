/** @jsxImportSource theme-ui */

import Link from 'next/link';
import { useEffect } from 'react';
import { useData } from '../pages/people/dataContextHook';
// import styles from '../styles/Index.module.css';

export default function Home() {
	//import data from contextAPI
	const [data, setData] = useData();

	return (
		<div sx={{ height: `calc(100vh - 60px)` }}>
			<div
				sx={{
					variant: 'containers.page',
					display: 'flex',
					alignItems: 'flex-start',
					height: '100%',
					backgroundColor: 'background',
				}}
			>
				<div>
					<h1 sx={{ fontSize: 8, p: 2 }}>Books App</h1>
					<p sx={{ p: 2 }}>
						Click the Books link at the top to see all our books.
					</p>
					<p sx={{ p: 2 }}>
						<Link href="/people">
							<a>Or tap here if this is closer</a>
						</Link>
						.
					</p>
				</div>
			</div>
		</div>
	);
}

/** @jsxImportSource theme-ui */

import Link from 'next/link';
import { useData } from './dataContextHook';
import { useEffect } from 'react';

export default function People() {
	const [dataState, setData] = useData();

	useEffect(() => {}, []);
	console.log(dataState);
	return (
		<div sx={{ variant: 'containers.page' }}>
			<h1 sx={{ py: 2, px: 4 }}>People Directory</h1>
			<Link href="/add" as="/add">
				<a>
					<button>Add New</button>
				</a>
			</Link>

			<div
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
					py: 2,
					px: 4,
				}}
			>
				{dataState ? (
					dataState.map((person) => (
						<div key={person.id} sx={{ width: '33%', p: 2 }}>
							<Link
								key={person.id}
								href="/people/[id]"
								as={`/people/${person.id}`}
							>
								<a sx={{ textDecoration: 'none', cursor: 'pointer' }}>
									<div sx={{ variant: 'containers.card' }}>
										<strong>{person.name}</strong>
									</div>
								</a>
							</Link>
						</div>
					))
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	);
}

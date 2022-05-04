/** @jsxImportSource theme-ui */

import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from './dataContextHook';
export default function Note() {
	const router = useRouter();
	const { id } = router.query;
	const [person, setPerson] = useState(undefined);
	const [dataState, setData] = useData();

	const getPersonById = useCallback(() => {
		const findPerson = dataState.find((item) => item.id == id);
		if (findPerson) {
			setPerson(findPerson);
		} else {
			fetch('/api/people')
				.then((resp) => {
					if (!resp.ok) throw new Error(resp.statusText);
					return resp.json();
				})
				.then((results) => {
					setPerson(results.person);
				})
				.catch((err) => {
					console.warn(err.message);
					setPerson(['fake']);
				});
		}
		console.log({ dataState });
	}, [id, dataState]);

	useEffect(() => {
		getPersonById();
		//console.log({ dataState });
	}, [getPersonById]);

	const deletePerson = useCallback(() => {
		setData('DELETE', id);
	}, [setData, id]);

	return (
		<div sx={{ variant: 'containers.page' }}>
			{person && (
				<div sx={{ py: 2, px: 4, fontSize: 5 }}>
					<Image
						src={`/images/${person.imageFileName}`}
						alt={'Headshot image of' + person.name}
						width={200}
						height={190}
					/>

					<h1>{person.name}</h1>
					<h2>{person.age}</h2>
					<h3>{person.location}</h3>
					<h3>{person.profession}</h3>
				</div>
			)}
			<Link href="/people/edit" as={`/people/${id}/edit`}>
				<a>
					<button>Edit Entry</button>
				</a>
			</Link>
			<Link href="/people" as="/people">
				<a>
					<button
						onClick={() => {
							deletePerson();
						}}
					>
						Delete Entry
					</button>
				</a>
			</Link>
			<p sx={{ px: 4 }}>
				<Link href="/people">
					<a>Back to List</a>
				</Link>
			</p>
		</div>
	);
}

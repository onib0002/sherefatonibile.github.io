import Link from 'next/link';
import { useData } from '../people/dataContextHook';
import { useEffect, useState, useCallback } from 'react';

export default function Add() {
	const [data, setData] = useData();

	const [name, setName] = useState(undefined);
	const [age, setAge] = useState(undefined);
	const [location, setLocation] = useState(undefined);
	const [profession, setProfession] = useState(undefined);
	const [imageLink, setImageLink] = useState(undefined);

	const addNew = useCallback(() => {
		console.log('adding new entry');
		setData('INSERT', {
			name: name,
			age: age,
			location: location,
			profession: profession,
			imageFileName: imageLink,
		});
	}, [setData, name, age, location, profession, imageLink]);

	useEffect(() => {}, []);
	return (
		<div sx={{ variant: 'containers.page' }}>
			<h1 sx={{ py: 2, px: 4 }}>Add New Person</h1>
			<form>
				<label htmlFor="name">Name: </label>
				<br />
				<input
					type="text"
					id="name"
					name="name"
					onChange={(ev) => {
						setName(ev.target.value);
					}}
				/>
				<br />
				<label htmlFor="age">Age: </label>
				<br />
				<input
					type="text"
					id="age"
					name="age"
					onChange={(ev) => {
						setAge(ev.target.value);
					}}
				/>
				<br />
				<label htmlFor="location">Location: </label>
				<br />
				<input
					type="text"
					id="location"
					name="location"
					onChange={(ev) => {
						setLocation(ev.target.value);
					}}
				/>
				<br />
				<label htmlFor="profession">Profession: </label>
				<br />
				<input
					type="text"
					id="profession"
					name="profession"
					onChange={(ev) => {
						setProfession(ev.target.value);
					}}
				/>
				<br />
				<label htmlFor="imageLink">Link To Image: </label>
				<br />
				<input
					type="text"
					id="imageLink"
					name="imageLink"
					onChange={(ev) => {
						setImageLink(ev.target.value);
					}}
				/>
				<br />
				<Link href="/people" as={'/people'}>
					<a>
						<button
							type="submit"
							onClick={() => {
								addNew();
							}}
						>
							Add New
						</button>
					</a>
				</Link>
			</form>
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
				{data ? (
					data.map((person) => (
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
					<div>Loading Data</div>
				)}
			</div>
		</div>
	);
}

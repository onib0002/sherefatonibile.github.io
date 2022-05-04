import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useData } from '../dataContextHook';
export default function Note() {
	const [data, setData] = useData();
	const [name, setName] = useState(undefined);
	const [age, setAge] = useState(undefined);
	const [location, setLocation] = useState(undefined);
	const [profession, setProfession] = useState(undefined);
	const [imageLink, setImageLink] = useState(undefined);
	const id =
		Number(window.location.pathname.split('/')[2]) ||
		window.location.pathname.split('/')[2];
	const person = data ? data.find((n) => n.id === id) : { name: 'loading' };
	console.log({ data });
	console.log(id);
	const editPerson = useCallback(() => {
		setData('UPDATE', {
			id: id,
			name: name,
			age: age,
			location: location,
			profession: profession,
			imageFileName: imageLink,
		});
	}, [name, age, location, profession, imageLink, setData, id]);
	useEffect(() => {
		//console.log(id);
	}, [id]);
	return person ? (
		<div sx={{ variant: 'containers.page' }}>
			<h1 sx={{ py: 2, px: 4 }}>Edit {``}</h1>
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
				<Link href="/people" as="/people">
					<a>
						<button
							type="submit"
							onClick={() => {
								editPerson();
							}}
						>
							Edit Person
						</button>
					</a>
				</Link>
			</form>
		</div>
	) : (
		<div>loading...</div>
	);
}

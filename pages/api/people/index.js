// /api/notes end point
import nc from 'next-connect';
import people from '../../../datasource/data';
const handler = nc()
	.get((req, res) => {
		//returns all people
		res.json({ people: people });
	})
	.post((req, res) => {
		console.log('posing ', req.body.payload);
		//adds a new person
		const id = Date.now();
		const person = { ...req.body.payload, id };
		//people.push(person);

		res.json({ person: person });
	});

export default handler;

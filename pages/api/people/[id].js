import nc from 'next-connect';
import people from '../../../datasource/data';

const getPerson = (id) => people.find((n) => n.id === id);

const handler = nc()
	.get((req, res) => {
		console.log('get req');
		console.log('id: ', req.query.id);
		console.log('before getPerson:', people);
		const person = getPerson(req.query.id);
		console.log('after: ', people, person);
		if (!person) {
			res.status(404);
			res.end();
			return;
		}

		res.json({ person: person });
	})
	.patch((req, res) => {
		const person = getPerson(req.query.id);
		// req.query contains all the querystring and path parts
		// that follow after /api/notes

		if (!person) {
			res.status(404);
			res.end();
			return;
		}

		const i = people.findIndex((n) => n.id === req.query.id);
		const updated = { ...people, ...req.body };

		people[i] = updated;
		res.json({ person: updated });
	})
	.delete((req, res) => {
		console.log('deleting: ', req.query.id);
		const person = getPerson(req.query.id);

		if (!person) {
			res.status(404);
			res.end();
			return;
		}
		const i = people.findIndex((n) => n.id === req.query.id);
		console.log(i);
		//people.splice(i, 1);

		res.json({ people: req.query.id });
	});

export default handler;

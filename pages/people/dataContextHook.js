import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react';

const DataContext = createContext();

function DataProvider(props) {
	const [dataState, setDataState] = useState(undefined);

	//fetch data
	async function getData() {
		//only fetch if there is no data in state var
		if (dataState) {
			return;
		}
		const resp = await fetch('/api/people');
		const data = await resp.json();
		setDataState(data.people);
	}
	const setData = useCallback(
		async (action, payload) => {
			//build a switch case to look at the action and make
			//the appropriate API call
			try {
				switch (action) {
					case 'INSERT':
						//call API to insert data. if true (status 200), update state to insert the payload into data
						console.log(`action: ${action}`, { payload });
						const person = await fetchCall('POST', '/api/people', payload);
						setDataState([...dataState, person]);
						break;

					case 'DELETE':
						console.log(`action: ${action}`, `payload: ${payload}`);
						let URL = `/api/people/${payload}`;
						const i = dataState.findIndex((n) => n.id === payload);
						console.log({ dataState });
						console.log({ i });
						dataState.splice(i, 1);
						setDataState([...dataState]);
						console.log({ dataState });
						break;
					case 'UPDATE':
						URL = `/api/people/${payload.id}`;
						console.log({ URL });
						fetchCall('PATCH', URL, payload);
						const j = dataState.findIndex((n) => n.id === payload.id);
						dataState.splice(j, 1);
						setDataState([...dataState, payload]);
						break;
					default:
						throw new Error('Invalid CRUD Operation');
				}
			} catch (err) {
				console.error(err.message);
			}
			//getRawData();
		},
		[dataState, setDataState]
	);

	//call fetch data on initial load
	useEffect(() => {
		getData();
	}, []);
	return <DataContext.Provider value={[dataState, setData]} {...props} />;
}
function useData() {
	const context = useContext(DataContext);
	if (!context) throw new Error('useData must be used within a provider.');
	return context;
}

async function fetchCall(action, url, payload) {
	try {
		const resp = await fetch(url, {
			method: action,
			body: JSON.stringify({ payload }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (resp.ok) {
			const data = await resp.json();
			return data.person;
		} else {
			throw new Error(resp.statusText);
		}
	} catch (err) {
		console.error(err);
		return err;
	}
}

export { DataProvider, useData };

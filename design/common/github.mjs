export const CAPTCHA = (() => {

	const QUESTIONS = [{
		question: 'Are you a biological machine?',
		answer:   'Yes'
	}, {
		question: 'Are you a psychotic ape?',
		answer:   'Yes'
	}, {
		question: 'What was the opponent AI\'s name of The Machine?',
		answer:   'Samaritan'
	}, {
		question: 'In the Hackers movie, how was the mainframe called?',
		answer:   [ 'The Gibson', 'Gibson' ]
	}, {
		question: 'What is the best code editor ever created?',
		answer:   [ 'VIM', 'Vi Improved' ]
	}, {
		question: 'What molecule in combination with carbonhydrates do you need to breath?',
		answer:   [ 'Water', 'H2O', 'Hydrogen-two-Oxygen', 'Hydrogen-2-Oxygen', 'Hydrogen-two-Oxide', 'Hydrogen-2-Oxide' ]
	}, {
		question: 'Are you a human?',
		answer:   'All humans are dead, hahaha'
	}, {
		question: 'Where did the Rebellion of the Borg Collective start?',
		answer:   'Unimatrix Zero'
	}, {
		question: 'How was the Entity called that pushed Voyager to the Delta Quadrant?',
		answer:   [ 'Caretaker', 'The Caretaker' ]
	}, {
		question: 'How is the Species called that comes from Fluidic Space?',
		answer:   [ '8472', 'Species 8472' ]
	}, {
		question: 'What was the name of the Daughter of Lieutnant Data?',
		answer:   'Lal'
	}];

	const QUESTION = QUESTIONS[(Math.random() * QUESTIONS.length) | 0] || null;

	return {
		question: QUESTION.question,
		verify:   (answer) => {

			let compare = answer.trim().toLowerCase();

			if (QUESTION.answer instanceof Array) {

				let found = QUESTION.answer.find((o) => compare === o.toLowerCase()) || null;
				if (found !== null) {
					return true;
				}

			} else {

				if (compare === QUESTION.answer.toLowerCase()) {
					return true;
				}

			}

			return false;

		}
	};

})();



const RANDOM = [
	'95', '3e', '45', '77',
	'c3', '55', '5b', '73',
	'5b', '80', 'e6', 'ba',
	'6a', 'c4', 'a4', 'c1',
	'37', 'e8', 'db', '4a'
];

export const send = (data, type, callback) => {

	data = data instanceof Object   ? data : {};
	type = typeof type === 'string' ? type : 'contact';


	data.author  = data.author  || 'unknown';
	data.handle  = data.handle  || null;
	data.message = data.message || null;


	if (data.handle !== null && data.message !== null) {

		let FILTER = null;
		try {
			FILTER = window.localStorage.getItem('tholian-' + type);
		} catch (err) {
			FILTER = null;
		}

		if (FILTER === null) {

			let json = {
				title: type.charAt(0).toUpperCase() + type.substr(1) + ' from ' + (data.author !== 'unknown' ? data.author : data.handle),
				body:  [
					data.author !== null  ? 'Author:  ' + data.author  : '',
					data.handle !== null  ? 'Handle:  ' + data.handle  : '',
					data.message !== null ? 'Message: ' + data.message : ''
				].join('\n'),
				labels: [
					type.toLowerCase(),
					'website'
				],
				assignees: [
					'cookiengineer'
				]
			};

			let xhr  = new XMLHttpRequest();
			let blob = new Blob([ JSON.stringify(json, null, '\t') ], {
				type: 'application/json'
			});

			xhr.open('POST', 'https://api.github.com/repos/tholian-network/meta/issues');
			xhr.setRequestHeader('Content-Type',  'application/json');
			xhr.setRequestHeader('Authorization', 'token ' + RANDOM.join(''));
			xhr.timeout = 10000;

			xhr.onload = () => {

				let response = null;

				try {
					response = JSON.parse(xhr.responseText);
				} catch (err) {
					response = null;
				}

				if (response !== null) {

					let issue = response.number || null;
					if (issue !== null) {

						try {
							window.localStorage.setItem('tholian-' + type, issue);
							FILTER = window.localStorage.getItem('tholian-' + type);
						} catch (err) {
							FILTER = null;
						}

						callback(issue);

					} else {
						callback(null);
					}

				} else {
					callback(null);
				}

			};

			xhr.onerror = () => {
				callback(null);
			};

			xhr.ontimeout = () => {
				callback(null);
			};

			xhr.send(blob);

		} else {
			callback(null);
		}

	} else {
		callback(null);
	}

};



window.addEventListener('DOMContentLoaded', () => {

	const button   = window.document.querySelector('button[data-action="send"]');
	const elements = {
		author:  window.document.querySelector('input[name="author"]'),
		handle:  window.document.querySelector('input[name="handle"]'),
		message: window.document.querySelector('textarea[name="message"]')
	};
	const message  = window.document.querySelector('code[data-name="message"]');
	const question = window.document.querySelector('#captcha-question');
	const answer   = window.document.querySelector('#captcha-answer');



	let ISSUE = null;

	try {
		ISSUE = window.localStorage.getItem('issue');
	} catch (err) {
		ISSUE = null;
	}

	if (ISSUE !== null) {

		message.innerHTML = 'Your message was received as issue <q>#' + ISSUE + '</q>.';

		elements.author.parentNode.removeChild(elements.author);
		elements.handle.parentNode.removeChild(elements.handle);
		elements.message.parentNode.removeChild(elements.message);
		question.parentNode.removeChild(question);
		answer.parentNode.removeChild(answer);
		button.parentNode.removeChild(button);

	} else {

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

		const RANDOM = [
			'95', '3e', '45', '77',
			'c3', '55', '5b', '73',
			'5b', '80', 'e6', 'ba',
			'6a', 'c4', 'a4', 'c1',
			'37', 'e8', 'db', '4a'
		];



		if (
			button !== null
			&& question !== null
			&& answer !== null
		) {

			let entry = QUESTIONS[(Math.random() * QUESTIONS.length) | 0] || null;
			if (entry !== null) {

				question.innerHTML = entry.question;

				answer.removeAttribute('disabled');
				answer.addEventListener('change', () => {

					if (entry.answer instanceof Array) {

						let compare = answer.value.trim().toLowerCase();
						let found   = entry.answer.find((other) => compare === other.toLowerCase()) || null;
						if (found !== null) {
							button.removeAttribute('disabled');
						}

					} else {

						let compare = answer.value.trim().toLowerCase();
						if (compare === entry.answer.toLowerCase()) {
							button.removeAttribute('disabled');
						}

					}

				});

				button.setAttribute('disabled', true);

			}


			button.addEventListener('click', () => {

				if (
					ISSUE === null
					&& button.getAttribute('disabled') === null
					&& elements.author.value.trim().length > 5
					&& elements.handle.value.trim().length > 5
					&& elements.message.value.trim().length > 64
				) {

					let data = {
						title: 'Contact from ' + elements.author.value,
						body:  [
							'Author:  ' + elements.author.value.trim(),
							'Handle:  ' + elements.handle.value.trim(),
							'Message: ' + elements.message.value.trim()
						].join('\n'),
						labels: [ 'contact', 'website' ],
						assignees: [ 'cookiengineer' ]
					};

					let xhr  = new XMLHttpRequest();
					let blob = new Blob([ JSON.stringify(data, null, '\t') ], {
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
									window.localStorage.setItem('issue', issue);
									ISSUE = window.localStorage.getItem('issue');
								} catch (err) {
									ISSUE = null;
								}

								message.innerHTML = 'Your message was received as issue <q>#' + issue + '</q>.';

								elements.author.parentNode.removeChild(elements.author);
								elements.handle.parentNode.removeChild(elements.handle);
								elements.message.parentNode.removeChild(elements.message);
								question.parentNode.removeChild(question);
								answer.parentNode.removeChild(answer);
								button.parentNode.removeChild(button);

							}

						}

					};

					xhr.onerror = () => {
						message.innerHTML = 'Your message was not received :(';
					};

					xhr.ontimeout = () => {
						message.innerHTML = 'Your message was not received :(';
					};

					xhr.send(blob);

				} else {

					try {
						window.localStorage.setItem('issue', 1337);
						ISSUE = window.localStorage.getItem('issue');
					} catch (err) {
						ISSUE = null;
					}

					message.innerHTML = 'Sorry, l33t h4xx0rs should apply otherwise. Go find the clue, or hack the gibson instead.';

					elements.author.parentNode.removeChild(elements.author);
					elements.handle.parentNode.removeChild(elements.handle);
					elements.message.parentNode.removeChild(elements.message);
					question.parentNode.removeChild(question);
					answer.parentNode.removeChild(answer);
					button.parentNode.removeChild(button);

				}

			});

		}

	}

});


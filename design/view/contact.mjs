
import { CAPTCHA, send } from '../common/github.mjs';



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



	const cleanup = () => {

		elements.author.parentNode.removeChild(elements.author);
		elements.handle.parentNode.removeChild(elements.handle);
		elements.message.parentNode.removeChild(elements.message);
		question.parentNode.removeChild(question);
		answer.parentNode.removeChild(answer);
		button.parentNode.removeChild(button);

	};



	let FILTER = null;

	try {
		FILTER = window.localStorage.getItem('tholian-contact');
	} catch (err) {
		FILTER = null;
	}

	if (FILTER !== null) {

		message.innerHTML = 'Your message was received as issue <q>#' + FILTER + '</q>.';
		cleanup();

	} else {

		if (
			button !== null
			&& question !== null
			&& answer !== null
		) {

			question.innerHTML = CAPTCHA.question;

			answer.removeAttribute('disabled');
			answer.addEventListener('change', () => {

				let result = CAPTCHA.verify(answer.value);
				if (result === true) {
					button.removeAttribute('disabled');
				}

			});

			button.setAttribute('disabled', true);

			button.addEventListener('click', () => {

				if (
					FILTER === null
					&& button.getAttribute('disabled') === null
					&& elements.author.value.trim().length > 5
					&& elements.handle.value.trim().length > 5
					&& elements.message.value.trim().length > 64
				) {

					send({
						author:  elements.author.value.trim(),
						handle:  elements.handle.value.trim(),
						message: elements.message.value.trim()
					}, 'contact', (issue) => {

						if (issue !== null) {

							message.innerHTML = 'Your message was received as issue <q>#' + issue + '</q>.';
							cleanup();

						} else {

							message.innerHTML = 'Your message was not received :(';
							cleanup();

						}

					});

				} else {

					try {
						window.localStorage.setItem('tholian-contact', 1337);
						FILTER = window.localStorage.getItem('tholian-contact');
					} catch (err) {
						FILTER = null;
					}

					message.innerHTML = 'Sorry, l33t h4xx0rs should apply otherwise. Go hack the gibson instead.';
					cleanup();

				}

			});

		}

	}

});


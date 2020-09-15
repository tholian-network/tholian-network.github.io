
import { send } from '../common/github.mjs';



window.addEventListener('DOMContentLoaded', () => {

	let plans = Array.from(window.document.querySelectorAll('#commercial-plans div'));
	if (plans.length > 0) {

		plans.forEach((plan) => {

			plan.addEventListener('mouseover', () => {

				plans.forEach((other) => {
					other.className = (other === plan) ? 'active' : '';
				});

			});

		});

	}

	let buttons = Array.from(window.document.querySelectorAll('button[data-action="register"]'));
	let dialog  = window.document.querySelector('dialog');
	if (dialog !== null) {

		let close = dialog.querySelector('button[data-action="close"]');
		if (close !== null) {

			close.addEventListener('click', () => {
				dialog.close();
			});

		}

		let button = dialog.querySelector('button[data-action="send"]');
		if (button !== null) {

			button.addEventListener('click', () => {

				let email = dialog.querySelector('input[name="email"]');
				if (email !== null) {

					let active = plans.find((plan) => plan.className === 'active') || null;
					let value  = email.value.trim();

					if (
						active !== null
						&& value.includes('@')
						&& value.includes('.')
						&& value.split('.').shift().length >= 3
						&& value.split('.').pop().length >= 2
					) {

						let button = active.querySelector('button[data-action="register"]');
						let plan   = '???';

						if (button !== null) {
							plan = button.getAttribute('data-plan');
						}

						send({
							handle:  value,
							message: 'I\'m interested in the launch of the "' + plan + '" Plan.'
						}, 'services', () => {
							dialog.close();
						});

					}

				}

			});

		}


		if (buttons.length > 0) {

			buttons.forEach((button) => {

				button.addEventListener('click', () => {

					let plan = button.getAttribute('data-plan');
					let PLANS = [ 'private', 'lieutenant', 'commander', 'admiral' ];
					if (PLANS.includes(plan) === true) {
						// window.location.href = 'https://radar.tholian.network/register.html?plan=' + plan;
						dialog.show();
					}

				});

			});

		}

	}

});


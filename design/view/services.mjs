
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
	if (buttons.length > 0) {

		buttons.forEach((button) => {

			button.addEventListener('click', () => {

				let plan = button.getAttribute('data-plan');
				let PLANS = [ 'private', 'lieutenant', 'commander', 'admiral' ];
				if (PLANS.includes(plan) === true) {
					window.location.href = 'https://radar.tholian.network/register.html?plan=' + plan;
				}

			});

		});

	}

});



window.addEventListener('DOMContentLoaded', () => {

	let plans = Array.from(window.document.querySelectorAll('#commercial-plans div'));
	if (plans.length > 0) {

		plans.forEach((plan) => {

			plan.addEventListener('mouseover', () => {

				plans.forEach((other) => {
					other.className = '';
				});

				plan.className = 'active';

			});

		});

	}

});

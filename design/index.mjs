
window.addEventListener('DOMContentLoaded', () => {

	let header = window.document.querySelector('header');
	if (header !== null) {

		header.style['padding-top']    = '0px';
		header.style['padding-bottom'] = '0px';

		setTimeout(() => {

			let box = header.getBoundingClientRect();

			header.style['padding-top']    = ((window.innerHeight - box.height) / 2) + 'px';
			header.style['padding-bottom'] = ((window.innerHeight - box.height) / 2) + 'px';

		}, 0);

	}

});


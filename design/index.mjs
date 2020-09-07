
window.addEventListener('DOMContentLoaded', () => {

	let header = window.document.querySelector('header');
	if (header !== null) {

		header.style['padding-top']    = '0px';
		header.style['padding-bottom'] = '0px';

		setTimeout(() => {

			let box = header.getBoundingClientRect();
			let padding = (window.innerHeight - box.height) / 2;
			if (padding > 256) {
				header.style['padding-top']    = padding + 'px';
				header.style['padding-bottom'] = padding + 'px';
			} else {
				header.style['padding-top']    = null;
				header.style['padding-bottom'] = null;
			}

		}, 100);

	}

});


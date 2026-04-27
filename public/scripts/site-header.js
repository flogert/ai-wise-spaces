const mobileNav = document.querySelector('[data-mobile-nav]');

if (mobileNav instanceof HTMLDetailsElement) {
	const summary = mobileNav.querySelector('summary');

	const syncExpandedState = () => {
		if (summary instanceof HTMLElement) {
			summary.setAttribute('aria-expanded', mobileNav.open ? 'true' : 'false');
		}
	};

	const closeMenu = () => {
		mobileNav.open = false;
		syncExpandedState();
	};

	syncExpandedState();
	mobileNav.addEventListener('toggle', syncExpandedState);

	document.addEventListener('click', (event) => {
		if (!mobileNav.open) {
			return;
		}

		if (!(event.target instanceof Node) || !mobileNav.contains(event.target)) {
			closeMenu();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	});

	mobileNav.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', closeMenu);
	});
}
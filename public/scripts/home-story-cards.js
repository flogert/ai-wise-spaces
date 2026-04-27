const storyStack = document.querySelector('[data-story-stack]');
const panelStack = document.querySelector('.panel-stack');
const storyButtons = Array.from(document.querySelectorAll('[data-story-trigger]'));

if (storyStack && panelStack && storyButtons.length > 0) {
	storyButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const storyId = button.getAttribute('data-story-id');
			if (!storyId) {
				return;
			}

			panelStack.setAttribute('data-active-story', storyId);
			storyButtons.forEach((candidate) => {
				const isActive = candidate === button;
				candidate.classList.toggle('is-active', isActive);
				candidate.setAttribute('aria-pressed', String(isActive));
			});
		});
	});
}
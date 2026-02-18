const form = document.querySelector('#quick-audit-form');
const statusMessage = document.querySelector('#quick-audit-status');
const result = document.querySelector('#quick-audit-result');
const missionPanel = document.querySelector('#quick-audit-mission');
const overall = document.querySelector('#quick-audit-overall');
const localSeo = document.querySelector('#quick-audit-local-seo');
const conversion = document.querySelector('#quick-audit-conversion');
const issue = document.querySelector('#quick-audit-issue');
const cta = document.querySelector('#quick-audit-cta');
const summary = document.querySelector('#quick-audit-summary');
const submitButton = form instanceof HTMLFormElement ? form.querySelector('button[type="submit"]') : null;

function normalizeWebsiteUrl(value) {
	const trimmed = value.trim();
	if (!trimmed) {
		return '';
	}

	if (/^https?:\/\//i.test(trimmed)) {
		return trimmed;
	}

	return `https://${trimmed}`;
}

function setPreviewButtonTone(score) {
	if (!(submitButton instanceof HTMLButtonElement)) {
		return;
	}

	submitButton.classList.remove('is-good', 'is-mid', 'is-bad');

	if (score >= 75) {
		submitButton.classList.add('is-good');
		return;
	}

	if (score >= 55) {
		submitButton.classList.add('is-mid');
		return;
	}

	submitButton.classList.add('is-bad');
}

async function requestQuickAudit(websiteUrl) {
	const response = await fetch('/api/quick-audit', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({ websiteUrl }),
	});

	const result = await response.json().catch(() => ({}));
	if (!response.ok) {
		throw new Error(typeof result.message === 'string' ? result.message : 'Preview unavailable.');
	}

	return result;
}

function showMissionPanel() {
	if (missionPanel instanceof HTMLElement) {
		missionPanel.hidden = false;
	}

	if (result instanceof HTMLElement) {
		result.hidden = true;
	}
}

function showResultPanel() {
	if (missionPanel instanceof HTMLElement) {
		missionPanel.hidden = true;
	}

	if (result instanceof HTMLElement) {
		result.hidden = false;
	}
}

form?.addEventListener('submit', async (event) => {
	event.preventDefault();

	if (!(form instanceof HTMLFormElement)) {
		return;
	}

	const formData = new FormData(form);
	const websiteUrl = normalizeWebsiteUrl(String(formData.get('websiteUrl') || ''));

	const websiteInput = form.querySelector('input[name="websiteUrl"]');
	if (websiteInput instanceof HTMLInputElement && websiteUrl) {
		websiteInput.value = websiteUrl;
	}

	if (statusMessage instanceof HTMLElement) {
		statusMessage.textContent = 'Analyzing live page signals...';
	}

	if (submitButton instanceof HTMLButtonElement) {
		submitButton.disabled = true;
	}

	showMissionPanel();

	try {
		const audit = await requestQuickAudit(websiteUrl);
		const scores = audit.scores;

		if (statusMessage instanceof HTMLElement) {
			statusMessage.textContent = 'Preview generated.';
		}

		setPreviewButtonTone(scores.overall);

		if (overall instanceof HTMLElement) {
			overall.textContent = `${scores.overall}/100`;
		}

		if (localSeo instanceof HTMLElement) {
			localSeo.textContent = `Local SEO: ${scores.localSeo}/100`;
		}

		if (conversion instanceof HTMLElement) {
			conversion.textContent = `Conversion: ${scores.conversion}/100`;
		}

		if (issue instanceof HTMLElement) {
			issue.textContent = 'Free review requests get simple website improvement notes. The full Visibility Audit is the paid $150 option.';
		}

		if (summary instanceof HTMLElement) {
			summary.textContent = audit.summary;
		}

		if (cta instanceof HTMLAnchorElement) {
			const params = new URLSearchParams({
				website: websiteUrl,
				score: String(scores.overall),
				source: 'quick-preview',
				issue: 'Preview score summary',
			});
			cta.href = `/book-a-free-audit?${params.toString()}`;
		}

		showResultPanel();
	} catch (error) {
		console.error(error);
		setPreviewButtonTone(0);
		showMissionPanel();
		if (statusMessage instanceof HTMLElement) {
			statusMessage.textContent = error instanceof Error ? error.message : 'Preview unavailable.';
		}
	} finally {
		if (submitButton instanceof HTMLButtonElement) {
			submitButton.disabled = false;
		}
	}
});
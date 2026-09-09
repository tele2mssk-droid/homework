export default class OffersFilters {
	constructor(config) {
		this.config = config;
		this.filters = document.querySelector(`.${this.config.FILTERS}`);

		if (!this.filters) {
			throw new Error('Filters container is missing.');
		}

		this.moreButton = this.filters.querySelector(`.${this.config.MORE}`);
		this.chips = [...this.filters.querySelectorAll(`.${this.config.CHIP}`)];

		if (!this.moreButton || !this.chips.length) {
			throw new Error('Filters elements are missing.');
		}

		this.isOpen = false;

		this.onMoreClick = this.onMoreClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.initEvents();
		this.updateButtonVisibility();
	}

	initEvents() {
		this.moreButton.addEventListener('click', this.onMoreClick);
		window.addEventListener('resize', this.onWindowResize);
	}

	removeEvents() {
		this.moreButton.removeEventListener('click', this.onMoreClick);
		window.removeEventListener('resize', this.onWindowResize);
	}

	onMoreClick() {
		this.isOpen = !this.isOpen;
		this.updateState();
	}

	updateState() {
		this.filters.classList.toggle(this.config.FILTERS_OPEN, this.isOpen);
		this.moreButton.setAttribute('aria-expanded', String(this.isOpen));
		this.moreButton.textContent = this.isOpen
			? this.config.LABEL.CLOSE
			: this.config.LABEL.OPEN;
	}

	hasHiddenChips() {
		return this.chips.some((chip) => chip.offsetParent === null);
	}

	updateButtonVisibility() {
		this.moreButton.hidden = !this.isOpen && !this.hasHiddenChips();
	}

	onWindowResize() {
		this.updateButtonVisibility();
	}

	destroy() {
		this.removeEvents();
	}
}

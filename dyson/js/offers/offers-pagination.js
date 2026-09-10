export default class OffersPagination {
	constructor(config) {
		this.config = config;
		this.list = document.querySelector(`.${this.config.LIST}`);
		this.prevButton = document.querySelector(`.${this.config.PREV}`);
		this.nextButton = document.querySelector(`.${this.config.NEXT}`);
		this.counter = document.querySelector(`.${this.config.COUNTER}`);

		if (!this.list || !this.prevButton || !this.nextButton || !this.counter) {
			throw new Error('Pagination elements are missing.');
		}

		this.cards = [...this.list.querySelectorAll(`.${this.config.CARD}`)];

		if (!this.cards.length) {
			throw new Error('Cards are missing.');
		}

		this.currentPage = 1;

		this.onPrevClick = this.onPrevClick.bind(this);
		this.onNextClick = this.onNextClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.initEvents();
		this.render();
	}

	initEvents() {
		this.prevButton.addEventListener('click', this.onPrevClick);
		this.nextButton.addEventListener('click', this.onNextClick);
		window.addEventListener('resize', this.onWindowResize);
	}

	removeEvents() {
		this.prevButton.removeEventListener('click', this.onPrevClick);
		this.nextButton.removeEventListener('click', this.onNextClick);
		window.removeEventListener('resize', this.onWindowResize);
	}

	getPerPage() {
		return window.innerWidth <= this.config.BREAKPOINT
			? this.config.PER_PAGE_MOBILE
			: this.config.PER_PAGE;
	}

	getTotalPages() {
		return Math.ceil(this.cards.length / this.getPerPage());
	}

	render() {
		const perPage = this.getPerPage();
		const totalPages = this.getTotalPages();

		if (this.currentPage > totalPages) {
			this.currentPage = totalPages;
		}

		const start = (this.currentPage - 1) * perPage;
		const end = start + perPage;

		this.cards.forEach((card, index) => {
			card.hidden = index < start || index >= end;
		});

		this.prevButton.disabled = this.currentPage === 1;
		this.nextButton.disabled = this.currentPage === totalPages;
		this.counter.textContent = `${this.currentPage} из ${totalPages}`;
	}

	goTo(page) {
		this.currentPage = page;
		this.render();
	}

	reset() {
		this.goTo(1);
	}

	setCards(cards) {
		this.cards = cards;
		this.reset();
	}

	onPrevClick() {
		if (this.currentPage > 1) {
			this.goTo(this.currentPage - 1);
		}
	}

	onNextClick() {
		if (this.currentPage < this.getTotalPages()) {
			this.goTo(this.currentPage + 1);
		}
	}

	onWindowResize() {
		this.render();
	}

	destroy() {
		this.removeEvents();
	}
}

const SORT_MAP = {
	'price-asc': { key: 'price', direction: 'asc' },
	'price-desc': { key: 'price', direction: 'desc' },
};

export default class OffersCardsSort {
	constructor(config, pagination = null) {
		this.config = config;
		this.pagination = pagination;
		this.list = document.querySelector(`.${this.config.LIST}`);

		if (!this.list) {
			throw new Error('Cards list is missing.');
		}

		this.cards = [...this.list.querySelectorAll(`.${this.config.CARD}`)];

		if (!this.cards.length) {
			throw new Error('Cards are missing.');
		}

		this.initialOrder = [...this.cards];

		this.onSortChange = this.onSortChange.bind(this);

		this.initEvents();
	}

	initEvents() {
		document.addEventListener(this.config.EVENT, this.onSortChange);
	}

	removeEvents() {
		document.removeEventListener(this.config.EVENT, this.onSortChange);
	}

	apply(cards) {
		cards.forEach((card) => this.list.append(card));

		if (this.pagination) {
			this.pagination.setCards(cards);
		}
	}

	sortBy(key, direction) {
		const sorted = [...this.cards].sort((first, second) => {
			const result = first.dataset[key] - second.dataset[key];

			return direction === 'asc' ? result : -result;
		});

		this.apply(sorted);
	}

	onSortChange(evt) {
		const value = evt.detail.value;

		if (value === this.config.DEFAULT_VALUE) {
			this.apply([...this.initialOrder]);
			return;
		}

		const rule = SORT_MAP[value];

		if (!rule) {
			return;
		}

		this.sortBy(rule.key, rule.direction);
	}

	destroy() {
		this.removeEvents();
	}
}

export default class OffersCounter {
	constructor(config) {
		this.config = config;
		this.counters = [...document.querySelectorAll(`.${this.config.COUNTER}`)];

		if (!this.counters.length) {
			throw new Error('Counters are missing.');
		}

		this.onCounterClick = this.onCounterClick.bind(this);
		this.onInputChange = this.onInputChange.bind(this);

		this.initEvents();

		this.counters.forEach((counter) => this.updateState(counter));
	}

	initEvents() {
		this.counters.forEach((counter) => {
			counter.addEventListener('click', this.onCounterClick);
			counter.addEventListener('change', this.onInputChange);
		});
	}

	removeEvents() {
		this.counters.forEach((counter) => {
			counter.removeEventListener('click', this.onCounterClick);
			counter.removeEventListener('change', this.onInputChange);
		});
	}

	getInput(counter) {
		return counter.querySelector(`.${this.config.INPUT}`);
	}

	getMinusButton(counter) {
		return counter.querySelector(`.${this.config.MINUS}`);
	}

	updateState(counter) {
		const input = this.getInput(counter);
		const minus = this.getMinusButton(counter);

		minus.disabled = Number(input.value) <= this.config.MIN;
	}

	setValue(counter, value) {
		const input = this.getInput(counter);

		input.value = Math.max(this.config.MIN, Math.min(this.config.MAX, value));
		this.updateState(counter);
	}

	onCounterClick(evt) {
		const button = evt.target.closest(`.${this.config.BUTTON}`);

		if (!button) {
			return;
		}

		const counter = evt.currentTarget;
		const current = Number(this.getInput(counter).value);
		const step = button.classList.contains(this.config.PLUS) ? 1 : -1;

		this.setValue(counter, current + step);
	}

	onInputChange(evt) {
		const counter = evt.currentTarget;
		const value = Number(this.getInput(counter).value);

		this.setValue(counter, Number.isNaN(value) ? this.config.MIN : value);
	}

	destroy() {
		this.removeEvents();
	}
}

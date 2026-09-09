export default class OffersSort {
	constructor(config) {
		this.config = config;
		this.sort = document.querySelector(`.${this.config.SORT}`);

		if (!this.sort) {
			throw new Error('Sort container is missing.');
		}

		this.button = this.sort.querySelector(`.${this.config.BUTTON}`);
		this.list = this.sort.querySelector(`.${this.config.LIST}`);
		this.value = this.sort.querySelector(`.${this.config.VALUE}`);
		this.options = [...this.sort.querySelectorAll(`.${this.config.OPTION}`)];

		if (!this.button || !this.list || !this.value || !this.options.length) {
			throw new Error('Sort elements are missing.');
		}

		this.isOpen = false;
		this.activeIndex = this.options.findIndex(
			(option) => option.getAttribute('aria-selected') === 'true'
		);

		if (this.activeIndex === -1) {
			this.activeIndex = 0;
		}

		this.selectedIndex = this.activeIndex;

		this.onButtonClick = this.onButtonClick.bind(this);
		this.onListClick = this.onListClick.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onDocumentClick = this.onDocumentClick.bind(this);

		this.initEvents();
	}

	initEvents() {
		this.button.addEventListener('click', this.onButtonClick);
		this.list.addEventListener('click', this.onListClick);
		this.sort.addEventListener('keydown', this.onKeyDown);
		document.addEventListener('click', this.onDocumentClick);
	}

	removeEvents() {
		this.button.removeEventListener('click', this.onButtonClick);
		this.list.removeEventListener('click', this.onListClick);
		this.sort.removeEventListener('keydown', this.onKeyDown);
		document.removeEventListener('click', this.onDocumentClick);
	}

	open() {
		if (this.isOpen) {
			return;
		}

		this.isOpen = true;
		this.list.hidden = false;
		this.sort.classList.add(this.config.SORT_OPEN);
		this.button.setAttribute('aria-expanded', 'true');
		this.setActive(this.selectedIndex);
	}

	close() {
		if (!this.isOpen) {
			return;
		}

		this.isOpen = false;
		this.list.hidden = true;
		this.sort.classList.remove(this.config.SORT_OPEN);
		this.button.setAttribute('aria-expanded', 'false');
		this.button.removeAttribute('aria-activedescendant');
	}

	toggle() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	setActive(index) {
		this.activeIndex = index;
		this.button.setAttribute('aria-activedescendant', this.options[index].id);

		this.options.forEach((option, optionIndex) => {
			option.classList.toggle(this.config.OPTION_ACTIVE, optionIndex === index);
		});

		this.options[index].scrollIntoView({ block: 'nearest' });
	}

	select(index) {
		this.selectedIndex = index;

		this.options.forEach((option, optionIndex) => {
			option.setAttribute('aria-selected', String(optionIndex === index));
		});

		this.value.textContent = this.options[index].textContent.trim();

		this.sort.dispatchEvent(
			new CustomEvent(this.config.EVENT, {
				bubbles: true,
				detail: { value: this.options[index].dataset.value },
			})
		);

		this.close();
		this.button.focus();
	}

	onButtonClick() {
		this.toggle();
	}

	onListClick(evt) {
		const option = evt.target.closest(`.${this.config.OPTION}`);

		if (!option) {
			return;
		}

		this.select(this.options.indexOf(option));
	}

	onDocumentClick(evt) {
		if (!this.sort.contains(evt.target)) {
			this.close();
		}
	}

	onKeyDown(evt) {
		switch (evt.key) {
			case 'Escape':
				if (this.isOpen) {
					evt.preventDefault();
					this.close();
					this.button.focus();
				}
				break;

			case 'ArrowDown':
				evt.preventDefault();

				if (!this.isOpen) {
					this.open();
					break;
				}

				this.setActive((this.activeIndex + 1) % this.options.length);
				break;

			case 'ArrowUp':
				evt.preventDefault();

				if (!this.isOpen) {
					this.open();
					break;
				}

				this.setActive(
					(this.activeIndex - 1 + this.options.length) % this.options.length
				);
				break;

			case 'Home':
				if (this.isOpen) {
					evt.preventDefault();
					this.setActive(0);
				}
				break;

			case 'End':
				if (this.isOpen) {
					evt.preventDefault();
					this.setActive(this.options.length - 1);
				}
				break;

			case 'Enter':
			case ' ':
				evt.preventDefault();

				if (this.isOpen) {
					this.select(this.activeIndex);
				} else {
					this.open();
				}
				break;

			case 'Tab':
				this.close();
				break;

			default:
				break;
		}
	}

	destroy() {
		this.removeEvents();
	}
}

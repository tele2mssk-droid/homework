import BurgerMenu from "./burger.js";
import OffersFilters from "./offers/offers-filters.js";
import OffersSort from "./offers/offers-sort.js";
import OffersCounter from "./offers/offers-counter.js";
import OffersPagination from "./offers/offers-pagination.js";
import OffersCardsSort from "./offers/offers-cards-sort.js";

try {
	new BurgerMenu({
		BURGER: "burger",
		BURGER_OPEN: "burger--open",
		HEADER_MENU: "header__menu",
		HEADER_MENU_OPEN: "header__menu--open",
		LABEL: {
			OPEN: "Открыть меню",
			CLOSE: "Закрыть меню",
		},
		PAGE_BODY: "page__body",
		PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
		MENU_LINK: "menu__link",
		BREAKPOINT: 768,
	});
} catch (error) {
	console.error(error);
}

try {
	new OffersFilters({
		FILTERS: "offers__filters",
		FILTERS_OPEN: "offers__filters--open",
		CHIP: "offers__chip",
		MORE: "offers__more",
		LABEL: {
			OPEN: "Показать ещё",
			CLOSE: "Свернуть",
		},
	});
} catch (error) {
	console.error(error);
}

try {
	new OffersSort({
		SORT: "offers__sort",
		SORT_OPEN: "offers__sort--open",
		BUTTON: "offers__sort-button",
		LIST: "offers__sort-list",
		VALUE: "offers__sort-value",
		OPTION: "offers__sort-option",
		OPTION_ACTIVE: "offers__sort-option--active",
		EVENT: "sortchange",
	});
} catch (error) {
	console.error(error);
}

try {
	new OffersCounter({
		COUNTER: "offers__counter",
		BUTTON: "offers__counter-button",
		MINUS: "offers__counter-button--minus",
		PLUS: "offers__counter-button--plus",
		INPUT: "offers__counter-input",
		MIN: 1,
		MAX: 99,
	});
} catch (error) {
	console.error(error);
}

try {
	const pagination = new OffersPagination({
		LIST: "offers__list",
		CARD: "offers__card",
		PREV: "offers__pagination-button--prev",
		NEXT: "offers__pagination-button--next",
		COUNTER: "offers__pagination-counter",
		PER_PAGE: 6,
		PER_PAGE_MOBILE: 4,
		BREAKPOINT: 390,
	});

	new OffersCardsSort(
		{
			LIST: "offers__list",
			CARD: "offers__card",
			EVENT: "sortchange",
			DEFAULT_VALUE: "popularity",
		},
		pagination
	);
} catch (error) {
	console.error(error);
}

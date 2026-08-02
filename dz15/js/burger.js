export default class BurgerMenu {
	constructor(config, headerFixedInstance = null) {
		this.config = config;
		this.burgerButton = document.querySelector(`.${this.config.BURGER}`);
		this.burgerMenu = document.querySelector(`.${this.config.HEADER_MENU}`);
		this.body = document.querySelector(`.${this.config.PAGE_BODY}`);
		this.headerFixedInstance = headerFixedInstance;
		this.main = document.querySelector(`.${this.config.MAIN}`);

		if (!this.burgerButton || !this.burgerMenu || !this.body) {
			throw new Error('Required DOM elements are missing.');
		}

		this.isMobileView = window.innerWidth <= this.config.BREAKPOINT;
		this.isEdgeSwipe = false;
		this.isHorizontalSwipe = false;
		this.touchStartX = 0;
		this.touchStartY = 0;

		this.onBurgerClick = this.onBurgerClick.bind(this);
		this.onBodyClick = this.onBodyClick.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.manageEvents();
		window.addEventListener('resize', this.onWindowResize);
	}

	manageEvents() {
		if (this.isMobileView) {
			this.initEvents();
		} else {
			this.removeEvents();
			this.hideBurgerMenu();
		}
	}

	initEvents() {
		// Click events
		this.burgerButton.addEventListener('click', this.onBurgerClick);
		this.body.addEventListener('click', this.onBodyClick);

		// Touch events — touchmove must be non-passive so preventDefault works
		this.body.addEventListener('touchstart', this.handleTouchStart, {
			passive: true,
		});
		this.body.addEventListener('touchmove', this.handleTouchMove, {
			passive: false,
		});
		this.body.addEventListener('touchend', this.handleTouchEnd);
	}

	removeEvents() {
		// Click events
		this.burgerButton.removeEventListener('click', this.onBurgerClick);
		this.body.removeEventListener('click', this.onBodyClick);

		// Touch events
		this.body.removeEventListener('touchstart', this.handleTouchStart);
		this.body.removeEventListener('touchmove', this.handleTouchMove);
		this.body.removeEventListener('touchend', this.handleTouchEnd);
	}

	onWindowResize() {
		const isNowMobileView = window.innerWidth <= this.config.BREAKPOINT;

		if (this.isMobileView !== isNowMobileView) {
			this.isMobileView = isNowMobileView;
			this.manageEvents();
		}
	}

	// Click events
	onBurgerClick() {
		const isOpen = this.burgerButton.classList.toggle(this.config.BURGER_OPEN);
		this.burgerButton.ariaLabel = isOpen
			? this.config.LABEL.CLOSE
			: this.config.LABEL.OPEN;
		this.burgerButton.ariaExpanded = isOpen;
		this.burgerMenu.classList.toggle(this.config.HEADER_MENU_OPEN, isOpen);
		this.body.classList.toggle(this.config.PAGE_BODY_NO_SCROLL, isOpen);

		if (this.main) {
			this.main.style.pointerEvents = isOpen ? 'none' : '';
		}

		if (this.headerFixedInstance) {
			if (isOpen) {
				this.headerFixedInstance.removeFixedClass();
			} else {
				this.headerFixedInstance.updateFixedClass();
			}
		}
	}

	showBurgerMenu() {
		this.burgerButton.classList.add(this.config.BURGER_OPEN);
		this.burgerButton.ariaLabel = this.config.LABEL.CLOSE;
		this.burgerButton.ariaExpanded = true;
		this.burgerMenu.classList.add(this.config.HEADER_MENU_OPEN);
		this.body.classList.add(this.config.PAGE_BODY_NO_SCROLL);

		if (this.main) {
			this.main.style.pointerEvents = 'none';
		}

		if (this.headerFixedInstance) {
			this.headerFixedInstance.removeFixedClass();
		}
	}

	hideBurgerMenu() {
		const wasOpen = this.isBurgerMenuOpen();
		this.burgerButton.classList.remove(this.config.BURGER_OPEN);
		this.burgerButton.ariaLabel = this.config.LABEL.OPEN;
		this.burgerButton.ariaExpanded = false;
		this.burgerMenu.classList.remove(this.config.HEADER_MENU_OPEN);
		this.body.classList.remove(this.config.PAGE_BODY_NO_SCROLL);

		if (this.main) {
			this.main.style.pointerEvents = '';
		}

		if (wasOpen && this.headerFixedInstance) {
			this.headerFixedInstance.updateFixedClass();
		}
	}

	isBurgerMenuOpen() {
		return this.burgerMenu.classList.contains(this.config.HEADER_MENU_OPEN);
	}

	onBodyClick(event) {
		const target = event.target;
		const isLinkInMenu = target.classList.contains(this.config.MENU_LINK);
		const isMenuOpen = this.isBurgerMenuOpen();
		const isClickOutsideMenu =
			!target.closest(`.${this.config.HEADER_MENU}`) &&
			!target.closest(`.${this.config.BURGER}`);

		if (
			(isLinkInMenu && window.innerWidth <= this.config.BREAKPOINT) ||
			(isMenuOpen && isClickOutsideMenu)
		) {
			this.hideBurgerMenu();
		}
	}

	// Touch events
	handleTouchStart(event) {
		const touch = event.changedTouches[0];
		this.touchStartX = touch.screenX;
		this.touchStartY = touch.screenY;
		this.isHorizontalSwipe = false;

		if (this.isBurgerMenuOpen()) {
			this.burgerMenu.style.transition = 'none';
		} else {
			// Register edge swipe only if the touch started near the right edge
			this.isEdgeSwipe =
				this.touchStartX >= window.innerWidth - this.config.EDGE_SWIPE_ZONE;
		}
	}

	handleTouchMove(event) {
		const touch = event.changedTouches[0];
		const deltaX = touch.screenX - this.touchStartX;
		const deltaY = touch.screenY - this.touchStartY;

		if (this.isBurgerMenuOpen()) {
			// Detect that this is a horizontal gesture, then block browser gestures
			if (
				!this.isHorizontalSwipe &&
				Math.abs(deltaX) > Math.abs(deltaY) &&
				Math.abs(deltaX) > 10
			) {
				this.isHorizontalSwipe = true;
			}

			if (this.isHorizontalSwipe) {
				event.preventDefault();
				const translateX = Math.max(0, deltaX);
				this.burgerMenu.style.right = `-${translateX}px`;
			}
		} else if (this.isEdgeSwipe) {
			// Same detection for edge-swipe-to-open
			if (
				!this.isHorizontalSwipe &&
				Math.abs(deltaX) > Math.abs(deltaY) &&
				Math.abs(deltaX) > 10
			) {
				this.isHorizontalSwipe = true;
			}

			if (this.isHorizontalSwipe) {
				event.preventDefault();
			}
		}
	}

	handleTouchEnd(event) {
		const touchEndX = event.changedTouches[0].screenX;
		const swipeDistance = touchEndX - this.touchStartX;

		if (this.isBurgerMenuOpen()) {
			this.burgerMenu.style.transition = '';
			this.burgerMenu.style.right = '';

			if (swipeDistance > this.config.SWIPE_THRESHOLD) {
				this.hideBurgerMenu();
			}
		} else if (
			this.isEdgeSwipe &&
			this.isHorizontalSwipe &&
			swipeDistance < -this.config.SWIPE_THRESHOLD
		) {
			this.showBurgerMenu();
		}

		this.isEdgeSwipe = false;
		this.isHorizontalSwipe = false;
	}
}

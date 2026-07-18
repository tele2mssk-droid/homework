// script.js
document.addEventListener("DOMContentLoaded", function () {
	const video = document.getElementById("videolol");
	const btn = document.getElementById("playBtn");

	let clickTimeout = null;

	function togglePlay() {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}

	function togglePlaySafe() {
		if (clickTimeout) return; // игнорируем слишком быстрый повторный клик
		togglePlay();
		clickTimeout = setTimeout(() => {
			clickTimeout = null;
		}, 300);
	}

	// Клик по кнопке или по видео — просто просим сменить состояние
	btn.addEventListener("click", function () {
	togglePlaySafe();
	btn.blur();
});
	video.addEventListener("click", togglePlaySafe);

	// Видимость кнопки зависит ТОЛЬКО от реального состояния видео
	video.addEventListener("play", function () {
		btn.style.display = "none";
	});

	video.addEventListener("pause", function () {
		btn.style.display = "block";
	});
});

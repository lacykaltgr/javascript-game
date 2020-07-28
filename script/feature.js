// Service worker caches page for offline use
	if (navigator.serviceWorker)
		navigator.serviceWorker.register('/sw.js');

//még nem biztos mire is jó ez
fullscreen: if (!window.matchMedia('(display-mode: fullscreen)').matches && !navigator.standalone) {
		const about = document.querySelector('.about');
		resize();
		window.addEventListener('resize', resize);
		window.addEventListener('beforeinstallprompt', e => {
			e.preventDefault();
			installPrompt = e;
			about.classList.add('auto');
		});
		window.addEventListener('appinstalled', () => {
			about.classList.remove('install');
		});
		about.classList.add('install', /^iP(hone|[ao]d)/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? 'ios' : 'android');
		if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled) break fullscreen;
		home.querySelector('.fullscreen-btn').style.display = 'block';
		game.querySelector('.fullscreen-btn').style.display = 'block';
	}

//fullscreen
function toggleFullscreen() {
		const docEl = document.documentElement;
		const requestFullscreen = docEl.requestFullscreen || docEl.webkitRequestFullScreen;
		const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
		if (!document.fullscreenElement && !document.webkitFullscreenElement)
			requestFullscreen.call(docEl);
		else
			exitFullscreen.call(document);
	}

//rezgés??
function buzz(e) {
		if (!e.target.value && !buzzerLock) return;
		e.preventDefault();
		e.stopPropagation();
		if (buzzerLock) return;

 function resize() {
		document.querySelector(':root').style.fontSize = window.innerHeight * .01 + 'px';
 }
 



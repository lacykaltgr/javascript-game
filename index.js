var ptDelta = (n => n === '\u221E' ? null : parseInt(n))(localStorage.ptDelta || 10);
var difficulty = parseInt(localStorage.difficulty || 1);
var stats = [];
var currPlayer = 0;
var tutorialStep = null;
var buzzerLock = false;
var canWarnTouch = true;
var interval;
var installPrompt;

document.onreadystatechange = function () {
	const home = document.querySelector('.home');
	const game = document.querySelector('.game');
	document.querySelector('.num-points').textContent = ptDelta;
	document.querySelector('.incr-points[value="-1"]').disabled = ptDelta === 1 ? true : false;
	document.querySelector('.incr-points[value="1"]').disabled = !ptDelta ? true : false;
	document.querySelector('[name="difficulty"][value="' + difficulty + '"]').checked = true;
	if (parseInt(localStorage.colorBlind))
		game.classList.add('color-blind');

	home.addEventListener('touchstart', () => {
		home.removeEventListener('touchstart', arguments.callee);
		home.removeEventListener('mousemove', warnTouch);
		home.classList.remove('warn-touch');
		canWarnTouch = false;
		document.querySelector('.warn').textContent = 'PORTRAIT ORIENTATION RECOMMENDED';
		warnPortrait();
	}, { passive: true });
	home.addEventListener('mousemove', warnTouch);
	document.querySelector('.buzzer').addEventListener('touchstart', e => {
		buzz(e);
	});
	document.querySelector('.buzzer').addEventListener('click', e => {
		buzz(e);
	});
	document.addEventListener('click', e => {
		if (!/BUTTON|LABEL/.test(e.target.tagName)) return;
		switch (e.target.classList.item(0)) {
			case 'play-btn':
				tutorialStep = null;
				game.classList.remove('tutorial', 'mark-up', 'mark-dn');
				changePage(home.classList.contains('activated') ? '.home' : '.game', '.setup', 'left');
				break;
			case 'tutorial-btn':
				changePage('.home', '.game', 'left');
				initTutorial();
				break;
			case 'about-btn':
				changePage('.home', '.about', 'left');
				break;
			case 'fullscreen-btn':
				toggleFullscreen();
				break;
			case 'install-btn':
				installPrompt.prompt();
				break;
			case 'incr-points':
				const pd = [1,2,3,4,5,6,7,8,9,10];
				ptDelta = pd[pd.indexOf(ptDelta) + parseInt(e.target.value)];
				document.querySelector('.num-points').textContent = ptDelta;
				document.querySelector('.incr-points[value="-1"]').disabled = ptDelta === 1 ? true : false;
				document.querySelector('.incr-points[value="1"]').disabled = !ptDelta ? true : false;
				localStorage.ptDelta = ptDelta || '\u221E';
				break;
			case 'difficulty':
				difficulty = parseInt(e.target.children[0].value);
				localStorage.difficulty = difficulty;
				break;
			case 'start-btn':
				changePage('.setup', '.game', 'left');
				initGame();
				break;
			case 'share-btn':
				navigator.share({
					title: 'Odd or Even',
					text: 'Multiplayer math game',
					url: 'https://oddoreven.app/'
				}).catch();
				break;
			case 'prev-btn':
				setTutorialStep(-1);
				break;
			case 'next-btn':
				setTutorialStep(1);
				break;
			case 'menu-btn':
				e.target.classList.toggle('opened');
				break;
			case 'restart-btn':
				initGame();
				break;
			case 'home-btn':
				document.querySelector('.menu-btn').classList.remove('opened');
				changePage('.game', '.home', 'right');
				break;
			case 'settings-btn':
			case 'close-btn':
				game.classList.toggle('settings');
				break;
			case 'color-blind-btn':
				game.classList.toggle('color-blind');
				localStorage.colorBlind = game.classList.contains('color-blind') ? 1 : 0;
				break;
			case 'back-btn':
				switch (document.querySelector('.activated').classList.item(1)) {
					case 'setup':
						changePage('.setup', '.home', 'right');
						break;
					case 'about':
						changePage('.about', '.home', 'right');
						break;
					case 'game':
						tutorialStep = null;
						game.classList.remove('tutorial', 'mark-up', 'mark-dn');
						changePage('.game', '.home', 'right');
				}
		}
	});
	document.addEventListener('animationend', e => {
		if (e.target.classList.contains('deactivated'))
			e.target.classList.remove('activated', 'deactivated', 'fly-out-left', 'fly-out-right');
		else if (e.target.classList.contains('activated'))
			e.target.classList.remove('fly-in-left', 'fly-in-right');
	});

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
		game.querySelector('.color-blind-btn').style.marginTop = '119rem';
	}

	if (!navigator.share)
		document.querySelector('.share-btn').style.display = 'none';

	// Service worker caches page for offline use
	if (navigator.serviceWorker)
		navigator.serviceWorker.register('/sw.js');

	function changePage(deactivated, activated, direction) {
		document.querySelector(deactivated).classList.add('deactivated', 'fly-out-' + direction);
		document.querySelector(activated).classList.add('activated', 'fly-in-' + direction);
	}

	function toggleFullscreen() {
		const docEl = document.documentElement;
		const requestFullscreen = docEl.requestFullscreen || docEl.webkitRequestFullScreen;
		const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
		if (!document.fullscreenElement && !document.webkitFullscreenElement)
			requestFullscreen.call(docEl);
		else
			exitFullscreen.call(document);
	}

	function warnTouch() {
		home.removeEventListener('mousemove', warnTouch);
		home.classList.add('warn-touch');
	}

	function warnPortrait() {
		if (canWarnTouch) return;
		if (window.innerWidth > window.innerHeight)
			home.classList.add('warn-portrait');
		else
			home.classList.remove('warn-portrait');
	}

	function buzz(e) {
		if (!e.target.value && !buzzerLock) return;
		e.preventDefault();
		e.stopPropagation();
		if (buzzerLock) return;
		score(e, parseInt(e.target.value));
	}

	function resize() {
		document.querySelector(':root').style.fontSize = window.innerHeight * .01 + 'px';
		warnPortrait();
	}
};

function initTutorial() {
	break
function setTutorialStep(n) {
	break

function initPlayers() {
	const rand = Math.trunc(Math.random() * 2);
	document.querySelector('.up > .player').textContent = rand ? 'Even' : 'Odd';
	let point = document.querySelector('.up > .point');
	point.id = 'pt' + (rand ? 0 : 1);
	point.textContent = 0;
	document.querySelector('.dn > .player').textContent = rand ? 'Odd' : 'Even';
	point = document.querySelector('.dn > .point');
	point.id = 'pt' + (rand ? 1 : 0);
	point.textContent = 0;
	stats = [
		{ p: 0, pt: 0, t: 0, d: rand ? 'up' : 'dn' },
		{ p: 1, pt: 0, t: 0, d: rand ? 'dn' : 'up' }
	];

	document.querySelector('.lead').style.top = '50%';
}

function initGame() {
	break

function score(e, val) {
	break

function genExpression() {
	// Choose player via random weighted by turns
	const sSort = [...stats].sort((a, b) => a.t - b.t);
	let rand = Math.random() * stats.reduce((s, v) => s + v.t + 7, 0);
	for (let i = 0; i < 2; i++) {
		rand -= sSort[i].t + 7;
		if (rand < 0) {
			currPlayer = 1 - sSort[i].p;
			break;
		}
	}
	if (tutorialStep)
		document.querySelector('.game').classList.add('mark-' + (stats[currPlayer].d));

var ptDelta = (n => n === '\u221E' ? null : parseInt(n))(localStorage.ptDelta || 10);
var difficulty = parseInt(localStorage.difficulty || 1);
var currPlayer = 0;
var buzzerLock = false;
var canWarnTouch = true;
var installPrompt;

document.onreadystatechange = function () {
	const home = document.querySelector('.home');
	const game = document.querySelector('.game');
	document.querySelector('.num-points').textContent = ptDelta;
	document.querySelector('.incr-points[value="-1"]').disabled = ptDelta === 5 ? true : false;
	document.querySelector('.incr-points[value="1"]').disabled = !ptDelta ? true : false;
	document.querySelector('[name="difficulty"][value="' + difficulty + '"]').checked = true;
//ha érintéssel indítasz nem figyelmeztet
	home.addEventListener('touchstart', () => {
		home.removeEventListener('touchstart', arguments.callee);
		home.removeEventListener('mousemove', warnTouch);
		home.classList.remove('warn-touch');
		canWarnTouch = false;
		document.querySelector('.warn').textContent = 'PORTRAIT ORIENTATION RECOMMENDED';
		warnPortrait();
	}, { passive: true });
//ha egérrel kezdesz figyelmeztet
	home.addEventListener('mousemove', warnTouch);
//buzz ha érintesz
	document.querySelector('.buzzer').addEventListener('touchstart', e => {
		buzz(e);
	});
//érintésre rezeg -- a piros gombra vonatkozott
	document.querySelector('.buzzer').addEventListener('click', e => {
		buzz(e);
	});
//érintésre honlapot vált
	document.addEventListener('click', e => {
		if (!/BUTTON|LABEL/.test(e.target.tagName)) return;
		switch (e.target.classList.item(0)) {
			case 'play-btn':
				game.classList.remove('tutorial', 'mark-up', 'mark-dn');
				changePage(home.classList.contains('activated') ? '.home' : '.game', '.players', 'left');
				break;
			case "proceed-btn":
				console.log("hu");
				changePage(".players", ".setup", "left");
				break;
			case 'tutorial-btn':
				changePage('.home', '.tutorial', 'left');
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
//pia mennyiségének beállítása
			case 'incr-points':
				const pd = [1,2,3,4,5,6,7,8,9,10, null];
				ptDelta = pd[pd.indexOf(ptDelta) + parseInt(e.target.value)];
				document.querySelector('.num-points').textContent = ptDelta;
				document.querySelector('.incr-points[value="-1"]').disabled = ptDelta === 1 ? true : false;
				document.querySelector('.incr-points[value="1"]').disabled = ptDelta === 10 ? true : false;
				localStorage.ptDelta = ptDelta || '\u221E';
				break;
			case 'difficulty':
				difficulty = parseInt(e.target.children[0].value);
				localStorage.difficulty = difficulty;
				break;
			case 'start-btn':
				changePage('.setup', '.game', 'left');
				break;
			case 'share-btn':
				navigator.share({
					title: 'Stoner',
					text: 'bazdmeg',
					url: 'lacyka.github.io'
				}).catch();
				break;
			case 'prev-btn':
				break;
			case 'next-btn':
				break;
			case 'menu-btn':
				e.target.classList.toggle('opened');
				break;
			case 'restart-btn':
				break;
			case 'home-btn':
				document.querySelector('.menu-btn').classList.remove('opened');
				changePage('.game', '.home', 'right');
				break;
			case 'settings-btn':
				break;
			case 'close-btn':
				game.classList.toggle('settings');
				break;
			case 'back-btn':
				switch (document.querySelector('.activated').classList.item(1)) {
					case 'setup':
						changePage('.setup', '.players', 'right');
						break;
					case 'about':
						changePage('.about', '.home', 'right');
						break;
					case 'game':
						game.classList.remove('tutorial', 'mark-up', 'mark-dn');
						changePage('.game', '.home', 'right');
						break;
					case 'tutorial':
						changePage('.tutorial', '.home', 'right');
						break;
					case 'players':
						changePage('.players', '.home', 'right');
						break;
					
				}
		}
	});

//átmenetek
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
	}

	if (!navigator.share)
		document.querySelector('.share-btn').style.display = 'none';

	// Service worker caches page for offline use
	if (navigator.serviceWorker)
		navigator.serviceWorker.register('/sw.js');

//váltás honlapok között (honnan, hova, milyen irányban)
	function changePage(deactivated, activated, direction) {
		document.querySelector(deactivated).classList.add('deactivated', 'fly-out-' + direction);
		document.querySelector(activated).classList.add('activated', 'fly-in-' + direction);
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
//egérmozgatásra figyelmeztet
	function warnTouch() {
		home.removeEventListener('mousemove', warnTouch);
		home.classList.add('warn-touch');
	}
//figyelmeztet ha nem portremodba vagy
	function warnPortrait() {
		if (canWarnTouch) return;
		if (window.innerWidth > window.innerHeight)
			home.classList.add('warn-portrait');
		else
			home.classList.remove('warn-portrait');
	}
//rezeg?
	function buzz(e) {
		if (!e.target.value && !buzzerLock) return;
		e.preventDefault();
		e.stopPropagation();
		if (buzzerLock) return;
	}
//resize
	function resize() {
		document.querySelector(':root').style.fontSize = window.innerHeight * .01 + 'px';
		warnPortrait();
	}
};

//csak próbálgatás
class Quest {
    constructor(type, content, penalty, special=None){
        this.type = type
        this.content = content
        this.penalty = penalty
        this.special = special
    }
}
//add.js használja
class Player{
    constructor(id,name,stand) {
        this.id = id;
        this.name = name;
        this.stand = stand;
        this.cup = 100;
    }
}




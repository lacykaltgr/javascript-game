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

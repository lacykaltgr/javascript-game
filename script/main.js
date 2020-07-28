var ptDelta = (n => n === '\u221E' ? null : parseInt(n))(localStorage.ptDelta || 10);
var difficulty = parseInt(localStorage.difficulty || 1);
var buzzerLock = false;
var installPrompt;

const home = document.querySelector('.home');
const game = document.querySelector('.game');
document.querySelector('.num-points').textContent = ptDelta;
document.querySelector('.incr-points[value="-1"]').disabled = ptDelta === 5 ? true : false;
document.querySelector('.incr-points[value="1"]').disabled = !ptDelta ? true : false;
document.querySelector('[name="difficulty"][value="' + difficulty + '"]').checked = true;


function changePage(deactivated, activated, direction) {
		document.querySelector(deactivated).classList.add('deactivated', 'fly-out-' + direction);
		document.querySelector(activated).classList.add('activated', 'fly-in-' + direction);
	}

document.addEventListener('animationend', e => {
		if (e.target.classList.contains('deactivated'))
			e.target.classList.remove('activated', 'deactivated', 'fly-out-left', 'fly-out-right');
		else if (e.target.classList.contains('activated'))
			e.target.classList.remove('fly-in-left', 'fly-in-right');
	});
function toggleFullscreen() {
	const docEl = document.documentElement;
	const requestFullscreen = docEl.requestFullscreen || docEl.webkitRequestFullScreen;
	const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
	if (!document.fullscreenElement && !document.webkitFullscreenElement)
		requestFullscreen.call(docEl);
	else
		exitFullscreen.call(document);
	}

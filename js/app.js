
document.addEventListener('animationend', e => {
    if (e.target.classList.contains('deactivated'))
        e.target.classList.remove('activated', 'deactivated', 'fly-out-left', 'fly-out-right');
    else if (e.target.classList.contains('activated'))
        e.target.classList.remove('fly-in-left', 'fly-in-right');
});


function goTo(from,to,direction) {
    from_element = document.querySelector(`#${from}`);
    from_element.classList.add("deactivated", `fly-out-${direction}`);

    to_element = document.querySelector(`#${to}`);
    to_element.classList.add("activated",`fly-in-${direction}`);
}

// function loadJSON(file,callback) {
//     return new Promise((resolve,reject) => {
//         var xobj = new XMLHttpRequest();
//         xobj.overrideMimeType("application/json");
//         xobj.open('GET', file, true);
//         xobj.onreadystatechange = function() {
//             if (xobj.readyState == 4 && xobj.status == "200") {
//                 resolve(xobj.responseText);
//             } else {
//                 reject(xobj.status);
//             }
//         }
//         xobj.send(null);
//     });
// }

function loadJSON(file) {
    return new Promise((resolve,reject) => {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == "200") {
                resolve(xobj.responseText);
            } 
        }
        xobj.send(null);
    });
}

function toggleFullscreen(element) {
    const docEl = document.documentElement;
    const requestFullscreen = docEl.requestFullscreen || docEl.webkitRequestFullScreen;
    const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen;
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        requestFullscreen.call(docEl);
        element.classList.add("fullscreen-btn");
    } else{
        exitFullscreen.call(document);
        element.classList.remove("fullscreen-btn");
    }
}

function alertError(msg) {
    window.navigator.vibrate(300);
    document.querySelector('#error').innerText = msg;
    setTimeout(()=>{
        document.querySelector('#error').innerText = "";
    },3000);
}
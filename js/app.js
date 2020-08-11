pages = document.querySelectorAll(".page");

pages.forEach(page => {
    page.addEventListener('animationend', e => {
        if (e.target.classList.contains('deactivated'))
            e.target.classList.remove('activated', 'deactivated', 'fly-out-left', 'fly-out-right');
        else if (e.target.classList.contains('activated'))
            e.target.classList.remove('fly-in-left', 'fly-in-right');
    });
});


let current = "home-screen";
location.hash = current;

document.addEventListener("DOMContentLoaded",(event)=>{
  const btns = document.querySelectorAll("[data-to]");
  btns.forEach(btn=>{
    btn.onclick = function(){
      location.hash = btn.dataset.to;
      if (btn.classList.contains("previous")) {
        goTo(current.replace("#",""),btn.dataset.to,"right")
      } else {
        goTo(current.replace("#",""),btn.dataset.to,"left")
      }
      current = location.hash;
    }
  });
})
window.addEventListener("hashchange",(event)=>{
  location.hash = current;
  // hogy a vissza gomb ne csináljon semmit se
});
window.addEventListener("beforeunload",(event)=>{
  event.preventDefault();
  event.returnValue = "";
  delete event["returnValue"]
});

function goTo(from,to,direction) {
    from_element = document.querySelector(`#${from}`);
    from_element.classList.add("deactivated", `fly-out-${direction}`);

    to_element = document.querySelector(`#${to}`);
    to_element.classList.add("activated",`fly-in-${direction}`);
    location.hash = to;
}


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
        element.classList.toggle("fs-on");
    } else{
        exitFullscreen.call(document);
        element.classList.toggle("fs-on");
    }
}

function alertError(msg) {
    window.navigator.vibrate(300);
    document.querySelector('#error').innerText = msg;
    setTimeout(()=>{
        document.querySelector('#error').innerText = "";
    },3000);
}

//
//
//Set dificulty
//
//
var DIFICULTY = parseInt(localStorage.DIFICULTY || 0);
var INFOS = {
    0:"A könnyű fokozat .... addshoghdofhao aohfohofhoafh ohafohof ",
    1:"A közepes fokozat .....gf souihg uhweoh foqh fiqf hoq foi",
    2:"A nehéz fokozat ..... ief iew fie ofwoe ",
    3:"A hárdkor fokozat ..... fsanhah ohaf oha foihas fdh disa"
}

const selectInput = document.querySelector("#dificulty");
const options = document.querySelectorAll("#dificulty > option")
let info = document.querySelector("#info");

document.addEventListener('DOMContentLoaded', (e) => {
    options[DIFICULTY].setAttribute("selected","selected")
    showInfo();
});

function setDificulty(element) {
    DIFICULTY = document.querySelector("#dificulty").value
    localStorage.DIFICULTY = DIFICULTY;
    showInfo();
}

function showInfo() {
    info.innerText = INFOS[DIFICULTY]
}

//
//
//Add player
//
//
var players;
const nameInput = document.querySelector('.name-input');
const nameButton = document.querySelector('.name-button');
const nameList = document.querySelector('.name-list');



document.addEventListener('DOMContentLoaded', (event) =>{
  if (localStorage.getItem('players') === null) {
    players = [];
  } else {
    players = JSON.parse(localStorage.getItem('players'));
  }
  players.forEach(player => {
    createHTML(player.name);
  });
});

nameButton.addEventListener('click', (event) => {
  event.preventDefault(); //Form submitting
  name = nameInput.value.trim().toProperCase()
  isUnique = true;
  for (player of players) {
    if (player.name == name) {
      isUnique = false;
      break
    }
  }
  if (name !== "") {
    if (isUnique) { 
      let player = {"id":0,"name":name,"charId":""};
      players.push(player);
      localStorage.setItem('players',JSON.stringify(players));
      createHTML(name);
    } else {
      alertError('Ilyen nevű játékos már létezik!');
    }

  } else {
    alertError('Kevés karakter');
  }
  nameInput.value = "";
});


nameList.addEventListener('click', (event) => {
  const item = event.target;
  
  if (item.classList.contains("trash-btn")) {
    const name = item.parentElement;
    const nameText = name.children[0].innerText;
    players.forEach((player, index) => {
      if (player.name === nameText) {
        players.splice(index,1)
      }
    });
    localStorage.setItem('players', JSON.stringify(players));
    name.remove();
  }
});

function test() {
  if (3 < players.length && players.length < 17){
    goTo('init-screen','dificulty-screen','left');
  } else if (players.length < 4) {
    alertError(`Minimum négy játékos szükséges az indításhoz!`);
  } else {
    alertError("Maximum tizenhat játékos tud résztvenni egyszerre!");
  }
}


function createHTML(name) {
  const nameDiv = document.createElement('div');
  nameDiv.classList.add('name');
  const newName = document.createElement('li');
  newName.innerText = name;
  newName.classList.add('name-item');
  nameDiv.appendChild(newName);
  const trashButton = document.createElement('button');
  trashButton.classList.add("btn")
  trashButton.innerText = '-';
  trashButton.classList.add('trash-btn');
  nameDiv.appendChild(trashButton);
  nameList.insertBefore(nameDiv,nameList.firstChild);  
}

//Prototypes 
String.prototype.toProperCase = function () {
  return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase()
};

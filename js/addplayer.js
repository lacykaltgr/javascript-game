var players;


//Selectors
const nameInput = document.querySelector('.name-input');
const nameButton = document.querySelector('.name-button');
const nameList = document.querySelector('.name-list');

//Event Listeners

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
      let player = new Player(0,name,"");
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



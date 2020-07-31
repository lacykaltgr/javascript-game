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
  }
  nameInput.value = "";
});


nameList.addEventListener('click', (event) => {
  const item = event.target;
  if (item.classList[0] === 'trash-btn') {
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


function createHTML(name) {
  const nameDiv = document.createElement('div');
  nameDiv.classList.add('name');
  const newName = document.createElement('li');
  newName.innerText = name;
  newName.classList.add('name-item');
  nameDiv.appendChild(newName);
  const trashButton = document.createElement('button');
  trashButton.innerText = 'Remove';
  trashButton.classList.add('trash-btn');
  nameDiv.appendChild(trashButton);
  nameList.appendChild(nameDiv);  
}

//Prototypes 
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


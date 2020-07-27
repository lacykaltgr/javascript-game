//Selectors
const nameInput = document.querySelector('.name-input');
const nameButton = document.querySelector('.name-button');
const nameList = document.querySelector('.name-list');

//Event Listeners
document.addEventListener('DOMContentLoaded', getNames);
nameButton.addEventListener('click', addName);
nameList.addEventListener('click', deleteName);


//Functions
function addName(event) {
  event.preventDefault(); //Form submitting

  const nameDiv = document.createElement('div');
  nameDiv.classList.add('name');

  const newName = document.createElement('li');
  name = nameInput.value.trim().toProperCase()
  newName.innerText = name;

  newName.classList.add('name-item');
  nameDiv.appendChild(newName);

  const trashButton = document.createElement('button');
  trashButton.innerText = 'Remove';
  trashButton.classList.add('trash-btn');
  nameDiv.appendChild(trashButton);
  if (name !== "") {
    if (saveLoacalNames(name)) {
      nameList.appendChild(nameDiv);
    }
  }
  nameInput.value = "";
}

function deleteName(event) {
  const item = event.target;
  if (item.classList[0] === 'trash-btn') {
    const name = item.parentElement;
    removeLocalName(name);
    name.remove();
  }
}

function saveLoacalNames(name) {
  let names;
  if (localStorage.getItem('names') === null) {
    names = [];
  } else {
    names = JSON.parse(localStorage.getItem('names'));
  }
  const isSame = (v) => v.name !== name; //kétszer van tagadva-->igaz; nem javítom ki, működik
  if (!names.every(isSame)) {
    document.querySelector('#error').innerText = 'Ilyen nevű játékos már létezik!'
    setTimeout(()=>{
        document.querySelector('#error').innerText = "";
    },3000);
    return false
  } else {
    let player = new Player(names.length,name,"");
    names.push(player);
    localStorage.setItem('names',JSON.stringify(names));
    return true 
  }
}

function getNames() {
  let names;
  if (localStorage.getItem('names') === null) {
    names = [];
  } else {
    names = JSON.parse(localStorage.getItem('names'));
  }
  names.forEach(player => {
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');

    const newName = document.createElement('li');
    newName.innerText = player.name;

    newName.classList.add('name-item');
    nameDiv.appendChild(newName);

    const trashButton = document.createElement('button');
    trashButton.innerText = 'Remove';
    trashButton.classList.add('trash-btn');
    nameDiv.appendChild(trashButton);

    nameList.appendChild(nameDiv);
  });
}

function removeLocalName(name){
  let names;
  if (localStorage.getItem('names') === null) {
    names = [];
  } else {
    names = JSON.parse(localStorage.getItem('names'));
  }
  const nameText = name.children[0].innerText;
  names.forEach((player, index) => {
    if (player.name === nameText) {
      names.splice(index,1)
    }
  });

  localStorage.setItem('names', JSON.stringify(names));
}

//Prototypes 
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};



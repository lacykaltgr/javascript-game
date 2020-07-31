import {shuffle} from './_.js'


let name = document.querySelector("#name");
let choice = document.querySelector("#choice");
let div = document.querySelector(".choosed")
let players = JSON.parse(localStorage.getItem('players'));
let cards = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

let i = -1;
cards = cards.slice(0,players.length-1);
cards.push(1); //nem írod át, nem lehet egyben
shuffle(cards);

console.log(div)

// document.addEventListener("click",(e) =>{
//     console.log(e.target);
// })
Choices()
next()
function next() {
    i++;
    name.innerText = players[i].name 
}


function Choices() {
    cards.forEach(element => {
        choice.innerHTML += `<li class="card aw"><p>${element}</p></li>`
    });
    choice.addEventListener('click', (event)=>{
        if (event.target.classList == "card aw") {
            event.target.classList.remove("aw");
            event.target.innerHTML += `<p>${players[i].name}</p>`
            div.appendChild(event.target)
            next(event.target)
        }
    });

}
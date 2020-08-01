import {shuffle} from './_.js'


let name = document.querySelector("#name");
let choice = document.querySelector("#choice");
let div = document.querySelector(".choosed")
let players = JSON.parse(localStorage.getItem('players'));
let cards = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

let i = 0;
cards = cards.slice(0,players.length-1);
cards.push(1); //nem írod át, nem lehet egyben
shuffle(cards);


// document.addEventListener("click",(e) =>{
//     console.log(e.target);
// })
Choices()

name.innerText = players[i].name;


function Choices() {
    cards.forEach(element => {
        choice.innerHTML += `
        <li class="scene">
            <div class="card">
                <div class="card__face card__face--front aw"></div>
                <div class="card__face card__face--back">${element}</div>
            </div>
        </li>`;
    });
    choice.addEventListener('click', (event)=>{
        if (event.target.classList == "card__face card__face--front aw") {
            event.target.parentElement.classList.add("is-flipped");
            event.target.parentElement.addEventListener("transitionend", ()=> { //neeeeeeeeeee basz, hufgeaeugewqrq hj dsaiugfasuig afgv faiuga fhuía d
                if (event.target.classList == "card__face card__face--front aw") { //egy nagyon szar megoldása, a transitionend event fasságára
                    event.target.classList.remove("aw");
                    div.appendChild(event.target.parentElement)
                    div.innerHTML += `<span>${players[i].name}</span>`
                    i++;
                    if (players[i]) {
                        name.innerText = players[i].name;
                    } else {
                        name.innerText = ""
                    }
                    
                }
            });
        }
    });

}
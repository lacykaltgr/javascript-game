import {shuffle} from './rand.js'


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

let lis = document.querySelectorAll("li");
console.log(lis)
let j = 130/players.length
lis.forEach((li,index)=>{
    li.style.transform = `translate( ${1-(index)}em, ${2+(index)}em) rotate(${-50+((index+1)*j)}deg)`;
    li.style.left = `${2.5*index}em`
});


name.innerText = players[i].name;


function Choices() {
    cards.forEach(element => {
        choice.innerHTML += `
        <li class="scene">
            <div class="card">
                <div class="card__face card__face--front"></div>
                <div class="card__face card__face--back">${element}</div>
            </div>
        </li>`;
    });
    choice.addEventListener('click', (event)=>{
        let element = event.target;
        if (element.classList == "card__face card__face--front") {
            element.parentElement.parentElement.style.left = "0";
            element.parentElement.parentElement.style.transform = "rotate(0deg) scale(1.3) translate(40%, -15vh)"
            element.parentElement.parentElement.style.transition = "transform 0.8s ease"
            element.parentElement.parentElement.addEventListener("transitionend", ()=> {
                element.parentElement.classList.add("is-flipped");
                element.parentElement.addEventListener("transitionend", ()=> { // hufgeaeugewqrq hj dsaiugfasuig afgv faiuga fhuía d
                    div.appendChild(element.parentElement)
                    div.innerHTML += `<span>${players[i].name}</span>`
                    i++;
                    if (players[i]) {
                        name.innerText = players[i].name;
                    } else {
                        name.innerText = ""
                    }
                });
            });
        }
    });

}
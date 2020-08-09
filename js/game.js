// import {shuffle} from "./rand.js"

function pickCard() {
    let hand = document.querySelector(".hand"); 
    let pick = document.querySelector("#pick");
    let pickedCards = document.querySelector(".picked-cards");
    let i = 1;
    pick.innerText = players[0].name;
    players.forEach((player)=>{
        let card = cardHtml();
        hand.appendChild(card);
        card.addEventListener("click", (event)=>{
            pick.innerText = players[i].name;
            pickedCards.appendChild(card);
            i++;
        });
    

    });    
}
function cardHtml(){
    let li = document.createElement("li");
    li.classList.add("card")
    let front = document.createElement("div");
    front.classList.add("inner");
    front.classList.add("front");
    back = document.createElement("div");
    back.classList.add("inner");
    back.classList.add("back");
    back.innerText = Math.round(Math.random()*100);
    li.appendChild(front);
    li.appendChild(back);
    return li
}

// var charIDarrayvill = ["101", "102", "103", "104"]
// var charIDarrayhero = ["001", "002", "003"]
// let data;
// let hasNextRound;
// let eventCompleted;

// let startBtn = document.querySelector("#start");
// let div = document.querySelector("#chars");
// let cardDiv = document.querySelector("#card");


// function nextRound() {
//     if (hasNextRound && eventCompleted) {
//         getCard();
//     } else {
//         //új játék kezdése stb...

//     }
// }

// function getCard() {
//     cardDiv.innerText = "Ez egy új kártya";
// }

// function makeDeck() {
//     let deck;
//     let charIds = [];
//     players.forEach(player => {
//         charIds.push(player.charId);
//     });

//     return deck;
// }


// async function start(){
//     data = JSON.parse( await loadJSON("data.json"));
//     let hero_curr;
//     let hero_num = round(players/4);
//     let villains = _.shuffle(charIDarrayvill);
//     let heroes = _.shuffle(charIDarrayhero);
//     players.getRandom().charID = "000";
//     for (hero_curr=0; hero_curr<hero_num; hero_curr++) {
//         players.getRandom().charID = heroes[hero_curr];
//     }
//     for (player of players) {
//         let i = 0;
//         player.charID = villain[i];
//         i++;
//     }
//     showCharacter(player);
    
//     startBtn.style.display = "none";
//     hasNextRound = true;
// }

// function showCharacter(player) {
//     const charDiv = document.getElementById('game-screen');
//     charDiv.classList.add('character');

//     const playerName = document.createElement('h2');
//     playerName.innerText = player.name;
//     playerName.classList.add('player-name');
//     charDiv.appendChild(playerName);

//     const charName = document.createElement('h3');
//     charName.innerText = data.chars[player.stand].name;
//     charName.classList.add('character-name');
//     charDiv.appendChild(charName);

//     div.appendChild(charDiv);
// }

// //Prototypes 
// Array.prototype.getRandom = function(){
//     return this[Math.floor(Math.random()*this.length)];
// }

// var round = 0
// var array = _.shuffle(["a", "b", "c", "d"]);
// function nextCard() {
//     const cardHolder = document.getElementById("cardHolder");
//     cardHolder.innerText = array[round] // lehet inkább törléssel kéne de így jónak tűnik jelenleg
//     round++ 
// }

// let chars = [1,2,3,4,5,6,7,8,9,10,11,12,13]
var charIDarrayvill = ["101", "102", "103", "104"]
var charIDarrayhero = ["001", "002", "003"]
let data;
let hasNextRound;


startBtn = document.querySelector("#start");
div = document.querySelector("#chars");

async function start(){
    //nem jó a callback promis kell; túl macerás
    // loadJSON('data.json',(str)=>{
    //     data = JSON.parse(str);
    // });
    data = JSON.parse( await loadJSON("data.json"));
    var hero_curr;
    var hero_num = round(players/4)++;
    let villains = _.shuffle(charIDarrayvill);
    let heroes = _.shuffle(charIDarrayhero);
    players.getRandom().charID = "000";
    for (hero_curr=0; hero_curr<hero_num; hero_curr++) {
        players.getRandom().charID = heroes[hero_curr];
    }
    for (player of players) {
        let i = 0;
        player.charID = villain[i];
        i++;
    }
    showCharacter(player);
    
    startBtn.style.display = "none";
    hasNextRound = true;
}

function showCharacter(player) {
    const charDiv = document.createElement('div');
    charDiv.classList.add('character');

    const playerName = document.createElement('h1');
    playerName.innerText = player.name;
    playerName.classList.add('player-name');
    charDiv.appendChild(playerName);

    const charName = document.createElement('h2');
    charName.innerText = data.chars[player.stand].name;
    charName.classList.add('character-name');
    charDiv.appendChild(charName);

    div.appendChild(charDiv);
}

//Prototypes 
Array.prototype.getRandom = function(){
    return this[Math.floor(Math.random()*this.length)];
}


// //karakterek sorsolása most számok lesznek (id)
// var players = JSON.parse(localStorage.getItem('players'));
// const chars = [1,2,3,4,5,6,7,8]

// card = document.querySelector("#card");
// test = document.querySelector("#test");

// function start() {
//     //Ki a stoner, az id 1 pl
//     players.getRandom().stand = 1;

//     //
//     for (player of players) {
//         if (!player.stand) {
//         player.stand = chars.getRandom();
//         }
        
//     }

// }

// function  epicCardchars(player) {
    
//     //kell promise, vagy await vagy valami
// }

// }

// /*
// const Game = {
//     count: [{"name":"alma","id":1}],
//     hasNext: true ? true:false,
//     goNext: function() {
//         if (this.hasNext) {
//             this.count += 1;
//             return true
//         } else {
//             return false
//         }
//     }
// }
// console.log(JSON.stringify(Game));

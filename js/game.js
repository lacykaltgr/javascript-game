// let stands = [1,2,3,4,5,6,7,8,9,10,11,12,13]
let data;
let hasNextRound;

startBtn = document.querySelector("#start");
div = document.querySelector("#stands");

async function start(){
    //nem jó a callback promis kell; túl macerás
    // loadJSON('data.json',(str)=>{
    //     data = JSON.parse(str);
    // });
    data = JSON.parse( await loadJSON("data.json"));
    //Ki a stoner, az id 1 pl
    players.getRandom().stand = 0;
    for (player of players) {
        if (player.stand !== 0) {
            player.stand =  data.stands.getRandom().id;
        }
        showStand(player);
    }
    startBtn.style.display = "none";
    hasNextRound = true;
}


function showStand(player) {
    const standDiv = document.createElement('div');
    standDiv.classList.add('stand');

    const playerName = document.createElement('h1');
    playerName.innerText = player.name;
    playerName.classList.add('player-name');
    standDiv.appendChild(playerName);

    const standName = document.createElement('h2');
    standName.innerText = data.stands[player.stand].name;
    standName.classList.add('stand-name');
    standDiv.appendChild(standName);

    div.appendChild(standDiv);
}

//Prototypes 
Array.prototype.getRandom = function(){
    return this[Math.floor(Math.random()*this.length)];
}


// //karakterek sorsolása most számok lesznek (id)
// var players = JSON.parse(localStorage.getItem('players'));
// const stands = [1,2,3,4,5,6,7,8]

// card = document.querySelector("#card");
// test = document.querySelector("#test");

// function start() {
//     //Ki a stoner, az id 1 pl
//     players.getRandom().stand = 1;

//     //
//     for (player of players) {
//         if (!player.stand) {
//         player.stand = stands.getRandom();
//         }
        
//     }

// }

// function  epicCardStands(player) {
    
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

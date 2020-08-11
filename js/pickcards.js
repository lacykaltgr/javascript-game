let charsDeck = new Set();
let data;
let cards;
let hand = document.querySelector(".hand");
let picked = document.querySelector(".picked");
let playerName = document.querySelector("#player-name");
let i = 0;

async function makeCharDeck(){
    data = JSON.parse( await loadJSON("data.json"));
    charsDeck.add(data.chars[0])
    let hero_num = Math.round(players.length/4)+1; 
    for (char of shuffle(data.chars)) {
        if (charsDeck.size < hero_num) {
            if (char.id.startsWith("0")) {
                charsDeck.add(char);
            }
        } else {
            break
        }
    }
    for (char of shuffle(data.chars)) {
        if (charsDeck.size < players.length) {
            if (char.id.startsWith("1")) {
                charsDeck.add(char);
            }
        } else {
            break
        }
    }
    
    
}

function init() { 
    makeCharDeck().then(()=>{
        shuffle([...charsDeck]).forEach(char => {
            card = cardHtml(char)
            hand.appendChild(card);
        });
        animate();
        playerName.innerText = players[0].name
    })
}
    
    
function animate() {
    cards = document.querySelectorAll(".card");
    let rotate = anime({
        targets:".card",
        rotate: anime.stagger([-players.length*5,players.length*5]),
        //  left: anime.stagger(-100),
        marginLeft: anime.stagger([-players.length*15,players.length*15]),
        easing: 'easeInOutQuad',
    })
    let playing = false;
    cards.forEach(card =>{ 
        card.addEventListener("click", (event)=>{
            if (playing) {
                return
            }
            playing = true;
            let pick = anime({
                targets: card,
                keyframes: [
                    {translateY: "-120%",
                    translateX: 10,},
                    {rotateY: "180deg"},
                ],
                rotate: 0,
                marginLeft: 0,
                endDelay: 1000,
                easing: 'easeInOutQuad',
                complete: function(anim) {
                    playing = false;
                    card.remove();
                    playerName.innerText = ( i+1 < players.length) ? players[i+1].name : "Mindenki választott";
                    picked.appendChild(statHtml(players[i].name,card.dataset.info))
                    i++;
                  }
            });
        });
    });
    
}
function statHtml(name,charInfo) {
    let char = JSON.parse(charInfo)
    let div = document.createElement("div");
    // div.classList
    if (char.id == "000") {
        div.classList.add("stoner")
    } else if (char.id .startsWith("0")) {
        div.classList.add("hero")
    } else {
        div.classList.add("villan")
    }
    let h1 = document.createElement("h1");
    h1.innerText = name;
    let h2 = document.createElement("h2");
    h2.innerText = (char.name)? char.name : char.id;
    let info = document.createElement("p");
    info.innerText = "Ide jönnek az infók, lehet egy pop up is.";
    div.appendChild(h1)
    div.appendChild(h2)
    div.appendChild(info)
    return div
}

function cardHtml(char){
    let div = document.createElement("div");
    div.dataset.info = JSON.stringify(char)
    div.classList.add("card")
    let front = document.createElement("div");
    front.classList.add("inner");
    front.classList.add("front");
    back = document.createElement("div");
    back.classList.add("inner");
    back.classList.add("back");
    back.innerText = `${char.id} -- ${char.name}`;
    div.appendChild(front);
    div.appendChild(back);
    return div
}

Array.prototype.getRandom = function(){
    return this[Math.floor(Math.random()*this.length)];
}
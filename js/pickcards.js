    let cards;
    let hand = document.querySelector(".hand");
    let picked = document.querySelector(".picked");
    let playerName = document.querySelector("#player-name");

function init() { 
    players.forEach(player => {
        card = cardHtml()
        hand.appendChild(card);

    });
    animate();
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
                    let num = card.lastChild.innerText;
                    card.remove();
                    picked.appendChild(statHtml("valami név",num))
                  }
            });
        });
    });
    
}
function statHtml(name,char) {
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    h1.innerText = name;
    let h2 = document.createElement("h2");
    h2.innerText = char;
    let info = document.createElement("p");
    info.innerText = "Ide jönnek az infók, lehet egy pop up is.";
    div.appendChild(h1)
    div.appendChild(h2)
    div.appendChild(info)
    return div
}

function cardHtml(){
    let div = document.createElement("div");
    div.classList.add("card")
    let front = document.createElement("div");
    front.classList.add("inner");
    front.classList.add("front");
    back = document.createElement("div");
    back.classList.add("inner");
    back.classList.add("back");
    back.innerText = Math.round(Math.random()*100);
    div.appendChild(front);
    div.appendChild(back);
    return div
}
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
    cards.forEach(card =>{ 
        card.addEventListener("click", (event)=>{
            let pick = anime({
                targets: card,
                keyframes: [
                    {translateY: "-120%",
                    translateX: 10,},
                    {rotateY: "180deg"},
                ],
                rotate: 0,
                marginLeft: 0,
                easing: 'easeInOutQuad',
                complete: function(anim) {
                    console.log(card);
                    card.style = "";
                    picked.appendChild(card)
                  }
            });
        });
    });
    
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
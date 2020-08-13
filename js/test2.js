

let topCard = document.querySelector("#top-card");
let deck = document.querySelector(".deck");
let CardHistory = document.querySelector(".card-history")
let CardOn = document.querySelector(".card-on")
let i = 0;

function createCardNode(text) {
    let li = document.createElement("li");
    li.classList.add("scene");
    let card = document.createElement("div");
    card.classList.add("card")
    let front = document.createElement("div");
    front.classList.add("card__face");
    front.classList.add("card__face--front");
    back = document.createElement("div");
    back.classList.add("card__face");
    back.classList.add("card__face--back")
    back.innerText = Math.round(Math.random()*100);

    card.appendChild(front);
    card.appendChild(back);
    li.appendChild(card);

    front.addEventListener("click", (event)=>{
        li.style.zIndex = i;
        deck.insertBefore(createCardNode("hi"),li);
        anime({
            targets: card,
                translateX:"10em",
                rotateY:"180deg",
                duration: 3000,
                easing: 'spring(1, 30, 11, 0)',
                complete: function(anim) {
                    CardOn.innerHTML = "";
                    CardHistory.innerHTML = "";
                    CardHistory.appendChild(card.cloneNode(true));
                    CardOn.appendChild(card.cloneNode(true))
                    li.remove()
                    i++;
                    anime({
                        targets: ".card-on > .card",
                        scale: 1.4,
                        duration:1500,
                    })
                }
        })
        
        
        // card.addEventListener("animationend", (event)=>{
        //     CardHistory.innerHTML = "";
        //     CardHistory.appendChild(card);
        //     li.remove()
        // });
    });

    return li;
    
}
deck.appendChild(createCardNode("hi"));

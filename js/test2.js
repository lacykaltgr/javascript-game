

let topCard = document.querySelector("#top-card");
let deck = document.querySelector(".deck");
let CardHistory = document.querySelector(".card-history")

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
        deck.insertBefore(createCardNode("hi"),li);

        card.classList.add("is-flipped");
        
        card.addEventListener("transitionend", (event)=>{
            CardHistory.innerHTML = "";
            card.style.zIndex = "-100"
            CardHistory.appendChild(card);
            li.remove()
        });
    });

    return li;
    
}
deck.appendChild(createCardNode("hi"));

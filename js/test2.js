cards = [1,2,3,4,5,6,7,8]
let i = 0;
btn = document.querySelector("#card");
ul = document.querySelector("ul")
function makeCard(card) {
    div = document.createElement("div");
    h = document.createElement("h");
    h.innerText = card;
    div.appendChild(h)
    return div
}

btn.addEventListener("click", (event)=> {
    ul.appendChild(makeCard(cards[i]));
    i++;
});
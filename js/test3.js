cards = document.querySelectorAll(".card");
picked = document.querySelector("#picked");
let j = 0;
cards.forEach((card,index) => {
    card.style.transform = `rotate(${j+40*index}deg)`;
    card.style.left = `${j+40*index}px`
    card.addEventListener("click", (event)=>{
        card.style.left = "0"
        
        card.classList.add("example");
        card.addEventListener("animationend", ()=>{
            card.classList.remove("example");
            card.style ="";
            picked.appendChild(card);
        });
    }); 
});
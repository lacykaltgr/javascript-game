var DIFICULTY = parseInt(localStorage.DIFICULTY || 0);
var INFOS = {
    0:"A könnyű fokozat .... addshoghdofhao aohfohofhoafh ohafohof ",
    1:"A közepes fokozat .....gf souihg uhweoh foqh fiqf hoq foi",
    2:"A nehéz fokozat ..... ief iew fie ofwoe ",
    3:"A hárdkor fokozat ..... fsanhah ohaf oha foihas fdh disa"
}


const selectInput = document.querySelector("#dificulty");
const options = document.querySelectorAll("#dificulty > option")
let info = document.querySelector("#info");

document.addEventListener('DOMContentLoaded', (e) => {
    options[DIFICULTY].setAttribute("selected","selected")
    showInfo();
});

function setDificulty(element) {
    DIFICULTY = document.querySelector("#dificulty").value
    localStorage.DIFICULTY = DIFICULTY;
    showInfo();
}

function showInfo() {
    info.innerText = INFOS[DIFICULTY]
}
import { Könyv } from "./feladvany.js";
import { Földrajz } from "./feladvany.js";
import { Személy } from "./feladvany.js";
const main = document.querySelector(".main");
const letter = document.querySelectorAll(".letter");
const start = document.querySelector(".start");
const score = document.querySelector(".score");
const vowel = document.querySelectorAll(".vowel");
let counter = 0;
const lives = document.querySelectorAll(".live");
let live = 5;
let gameScore = 0;

//////////////////////
function liveCountDown() {
  if (live > 0) {
    document.querySelector(`.live${live}`).style.opacity = "0";
    live--;
  }
  if (live === 0) {
    document.querySelector("body").style.display = "none";

    const p = document.createElement("p");
    p.classList.add("lose");
    p.textContent = "Ez most nem sikerült!";
    document.querySelector("html").style.backgroundColor = "black";
    document.querySelector("html").appendChild(p);
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  }
}

const feladvany = { Könyv, Földrajz, Személy };

const objLenght = Object.keys(feladvany).length;

const random = Math.floor(Math.random() * objLenght); //temakorok szama a feladvany objectben
var key = Object.keys(feladvany)[random]; //temakor neve

const valueLenght = Object.values(feladvany)[random].length; //tamakorben a feladvanyok szama
var value =
  Object.values(feladvany)[random][Math.floor(Math.random() * valueLenght)]; //feladvany

function AppendElements() {
  for (let i = 0; i < value.length; ++i) {
    const div = document.createElement("p");
    div.classList.add("line");
    main.appendChild(div);

    div.textContent = value[i];

    if (div.textContent === " ") {
      div.style.opacity = "0";
      counter++;
    }
    if (div.textContent === "-") {
      div.style.borderTop = "1px solid black";
      div.style.borderBottom = "none";
      counter++;
    }
    letter.forEach((l) =>
      l.addEventListener("click", function (e) {
        const pressedLetter = e.target.textContent;

        e.target.style.opacity = "0.2";
        if (pressedLetter === value[i] && div.style.color != "black") {
          div.style.color = "black";
          counter++;
          gameScore += 100;
          score.textContent = gameScore;
        }

        rightAnswer();
      })
    );
  }
  wrongLetter();
}
function rightAnswer() {
  if (counter === value.length) {
    document.querySelector(".game").style.display = "none";
    document.querySelector("html").classList.add("win");
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  }
}

function startGame() {
  document.querySelector("h1").textContent = key;
  document.querySelector(".lives").classList.remove("hide");
  document.querySelector(".keyboard").classList.remove("hide");
  start.style.display = "none";
  score.classList.remove("hide");
  AppendElements();
}
//startGame();
start.addEventListener("click", startGame);
///////////
function wrongLetter() {
  letter.forEach((l) =>
    l.addEventListener("click", function (e) {
      const pressedLetter = e.target.textContent;

      if (!value.includes(pressedLetter)) {
        liveCountDown();
      }
    })
  );
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
const wordsObj = {
  mario: ["PEACH", "MUSHROOM", "BROS.", "CASTLE"],
  pokemon: ["LEAGUE", "KANTO", "OAK", "GAMEFREAK"],
  megaman: ["ROCK&ROLL", "PROTO", "BASS", "CAPCOM", "BLUE HELMET"],
  kirby: ["PINK-BLACK-HOLE", "O.P.", "PUFFS", "STARS"],
  overwatch: ["C9'D", "I NEED HEALING",],
  masseffect: ["GETH", "ASARI", "QUARIANS"],
};
let copyObj = wordsObj;

/*
 SECTION 
 add event listener
 make an on click that when envoked runs other functions like s
 */

$("button").on("click", function () {
  addLetters();
  const word = getWord();
  setKeyWord(word);
  setTimer();
});

// make a function that creates buttons and populates the alphabet section with letter buttons

const $hintBox = $("div.nes-container.with-title");
$hintBox.hide();
const $keyWordBox = $("section.nes-container.is-dark.with-title#key-word");
$keyWordBox.hide();
const $health = $("#health");
$health.hide();
const addLetters = function () {
  $health.show();
  $hintBox.show();
  $keyWordBox.show();
  for (c of alphabet) {
    // NOTE creates letter buttons and appends them to the alphabet section
    const $letter = $(`<button class="letter-button">${c}</button>`);
    $("#start").hide();
    $("#alphabet").append($letter);
  }

  /* 
  SECTION 
  hand what happends when the the letter buttons are clicked
  if the letter is inside the key word
  the letter should appear in the answer section in the correct position
  make the letter unclickable
  
  if the letter is NOT inside the key word
  X out the letter and make it unclickable
  */

  /* add an onclick function for each button */
  $(".letter-button").on("click", handleClick);
};

/* 
SECTION 
create a function that chooses the key word and shows the hint for that world.
*/

const getWord = function () {
  const words = Object.keys(copyObj);
  const i = Math.floor(Math.random() * words.length);
  const word = words[i];
  console.log(copyObj);
  //NOTE above grabs a random key word

  const hintArr = copyObj[word];
  const j = Math.floor(Math.random() * hintArr.length);
  const hintWord = hintArr[j];
  const $hint = $("#hint");
  $hint.text(hintWord);
  //NOTE above grabs a random hint word related to the key word

  //NOTE return key word to be used
  delete copyObj[word];
  return word;
};

/* 
SECTION 
Set the keyWord to the key-word section
this function should take the key word and set it to the key-word section.
split the word and append each letter to the section.
*/

const setKeyWord = function (word) {
  const chars = word.split("");

  for (let c of chars) {
    const $char = $(`<span class="key-letter ${c}">${c}</span>`);
    $("#key-word").append($char);
  }
};

const handleClick = function (event) {
  const $keyLetters = $(".key-letter");
  for (let i = 0; i < $keyLetters.length; i++) {
    const char = $keyLetters[i].innerText;

    if (char === event.target.innerText) {
      $(event.target)
        .addClass("nes-btn is-success")
        .css("pointer-events", "none");
      $(event.target).removeClass(`is-error`);
      reveal(event);
      return;
    } else if (char !== event.target.innerText) {
      $(event.target)
        .addClass(`nes-btn is-error`)
        .css("pointer-events", "none");
    }
  }
  return reveal(event);
};

const revealLetter = function (char) {
  const $chars = $(`.${char}`);
  $chars.each(function () {
    $(this).css("color", "white");
  });
};

let guessCount = 5;
let score = 0;
let wordPoints = 0;
const removeHeart = function () {
  switch (guessCount) {
    case 0:
      guessCount === 4;
      $("#1").remove();
      break;
    case 1:
      guessCount === 3;
      $("#2").remove();
      break;
    case 2:
      guessCount === 2;
      $("#3").remove();
      break;
    case 3:
      guessCount === 1;
      $("#4").remove();
      break;
    case 4:
      guessCount === 0;
      $("#5").remove();
      break;
  }
};

const reveal = function (event) {
  if ($(event.target).hasClass(`letter-button nes-btn is-error`)) {
    guessCount--;
    if (guessCount !== 0) {
      $(event.target).addClass(`is-disabled`);
    }
    $("#guess").text(`Guesses:${guessCount}`);
    return removeHeart();
  } else if ($(event.target).hasClass(`letter-button nes-btn is-success`)) {
    $(event.target).addClass(`is-disabled`);
    score += 100;
    wordPoints += 100;
    $("#score").text(`Score:${score}`);
    revealLetter(event.target.innerText);
    rounds();
    endGame();
  }
};

/* SECTION TIME */
let timer;
let time = 300000;
const setTimer = function () {
  timer = setInterval(function () {
    if (guessCount === 0 || time === 0) {
      clearInterval(timer);
      endGame();
    } else {
      time--;
    }
    $("#time").text(`Time:${time}`);
  }, 1200);
};

/* 
NOTE
end game screen
if the guess count is less than 0 the game ends 
if the timer reaches 0 the game ends
removes 
*/

const endGame = function () {
  if (time === 0 || guessCount === 0) {
    clearInterval(timer);
    $("body").empty();
    const $body = $("body");

    $body
      .append(
        `<div class="nes-container is-centered is-dark with-title" id="ending">
      <p class="title">GAME OVER</p>
      <p>YOU'VE FAILED TO PROTECT THE CITY</p>
      </div>`
      )
      .css("border", "center");
    const $gameover = $(
      `div.nes-container.is-centered.is-dark.with-title#ending`
    );
    $gameover.append('<i class="nes-kirby"></i>');
  } else if (isEmpty(copyObj)) {
    clearInterval(timer);
    $("body").empty();

    return $("body")
      .append(`<div class="nes-container is-dark with-title id="ending">
      <p class="title">GAME OVER</p>
      <p>YOU'VE SAVED THE CITY!!!</p>
      </div>`);
  }
};

/* 
NOTE win function

once the players score reaches the length of the key-word * 100 
end the game with positive ending.
*/
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
let round = 1;
const rounds = function () {
  let keyWord = $("section .key-letter");
  const array = [];
  for (let i = 0; i < keyWord.length; i++) {
    if (!array.includes(keyWord[i].innerText)) {
      array.push(keyWord[i].innerText);
    }
  }

  if (wordPoints === array.length * 100) {
    time+=10;
    round++;
    $("#round").text(`Round:${round}`);
    wordPoints = 0;
    $("#alphabet").empty();
    addLetters();
    $("#key-word").empty();
    let word = getWord();
    setKeyWord(word);
  }
};

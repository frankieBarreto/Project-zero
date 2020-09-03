console.log(`HangMan`);

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
console.log(alphabet);

const wordsObj = {
  mario: ["PEACH", "MUSHROOM", "BROS.", "CASTLE", ],
  pokemon: ["LEAGUE", "KANTO", "OAK", "GAMEFREAK"],
  megaman: ["ROCK&ROLL", "PROTO", "BASS", "CAPCOM", "BLUE HELMET"],
  kirby: ["PINK", "O.P.", "PUFFS", 'STARS'],
  // superfamicom: ['nostalgia']
};

const imgObj = {
    head:
    "https://vignette.wikia.nocookie.net/yugioh/images/c/c0/ExodiatheForbiddenOne-TF04-JP-VG.jpg/revision/latest?cb=20120420185052",
  rightLeg:
    "https://uploads1.yugioh.com/card_images/4391/detail/Exodia---Right-LegofthefordibbenOn.jpg?1386973418",
  rightArm:
    "https://64.media.tumblr.com/33633ce5abcaa5bfddf3d9ef705e8569/tumblr_mvltycMdGh1rie4kjo1_500.jpg",
  leftArm:
    "https://uploads3.yugioh.com/card_images/4389/detail/Exodia---Left-Arm-ofthe-ForbiddenFL.jpg?1386973329",

    exodia: "https://makeagif.com/i/oWGw_c"
}
console.log(wordsObj);

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

const $hintBox = $('div.nes-container.with-title');
$hintBox.hide();
const $keyWordBox = $('section.nes-container.is-dark.with-title#key-word');
$keyWordBox.hide();
const $health = $('#health');
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
    const words = Object.keys(wordsObj);
    const i = Math.floor(Math.random() * words.length);
    const word = words[i];
    //NOTE above grabs a random key word
    
    const hintArr = wordsObj[word];
    const j = Math.floor(Math.random() * hintArr.length);
    const hintWord = hintArr[j];
    const $hint = $("#hint");
    $hint.text(hintWord);
    //NOTE above grabs a random hint word related to the key word
    
    //NOTE return key word to be used
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
            $(event.target).addClass("nes-btn is-success").css('pointer-events', 'none');
            $(event.target).removeClass(`is-error`);
            reveal(event);
            return;
        } else if (char !== event.target.innerText) {
            $(event.target).addClass(`nes-btn is-error`).css('pointer-events', 'none');
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
// const revealImg = function () {
//   switch (guessCount) {
//     case 0:
//       guessCount === 4;
//       $("#left-arm").attr("src", imgObj.leftArm).css('display', 'block');
//       break;
//     case 1:
//       guessCount === 3;
//       $("#head").attr("src", imgObj.head).css('display', 'block');
//       break;
//     case 2:
//       guessCount === 2;
//       $(" #right-arm").attr("src", imgObj.rightArm).css('display', 'block');
//       break;
//     case 3:
//       guessCount === 1;
//       $(" #right-leg").attr("src", imgObj.rightLeg).css('display', 'block');
//       break;
//     case 4:
//       guessCount === 0;
//       $(" #left-leg").attr("src", imgObj.rightLeg).css('display', 'block');
//       break;
//   }
// };
const revealImg = function () {
  switch (guessCount) {
    case 0:
      guessCount === 4;
      // $("#left-arm").attr("src", imgObj.leftArm).css('display', 'block');
      $("#1").remove();
      break;
    case 1:
      guessCount === 3;
      $("#2").remove();
      // $("#head").attr("src", imgObj.head).css('display', 'block');
      break;
    case 2:
      guessCount === 2;
      $("#3").remove();
      // $(" #right-arm").attr("src", imgObj.rightArm).css('display', 'block');
      break;
    case 3:
      guessCount === 1;
      $("#4").remove();
      // $(" #right-leg").attr("src", imgObj.rightLeg).css('display', 'block');
      break;
    case 4:
      guessCount === 0;
      $("#5").remove();
      // $(" #left-leg").attr("src", imgObj.rightLeg).css('display', 'block');
      break;
  }
};

const reveal = function (event) {
  if ($(event.target).hasClass(`letter-button nes-btn is-error`)) {
      guessCount--;
    if (guessCount !== 0) {
        $(event.target).addClass(`is-disabled`);
    }
    $("#guess").text(`Guesses: ${guessCount}`);
    return revealImg();
  } else if ($(event.target).hasClass(`letter-button nes-btn is-success`)) {
      $(event.target).addClass(`is-disabled`);
    score += 100;
    $("#score").text(`Score: ${score}`);
    revealLetter(event.target.innerText);
    win(timer);
  }
};

/* SECTION TIME */
let timer;
let time = 100000;
const setTimer = function () {
  timer = setInterval(function () {
    if (guessCount === 0 || time === 0) {
      clearInterval(timer);
      endGame();
    } else {
      time--;
    }
    $("#time").text(`Time: ${time}`);
  }, 1200);
};

/* 
SECTION
if the guess count is less than 0 the game ends 
if the timer reaches 0 the game ends
*/
const endGame = function () {
      clearInterval(timer);
        $('body').empty();
        const $body = $('body');

        $body.append(`<div class="nes-container is-centered is-dark with-title" id="ending">
        <p class="title">GAME OVER</p>
        <p>YOU'VE FAILED TO PROTECT THE CITY</p>
        </div>`).css('border', 'center');
        const $gameover = $(`div.nes-container.is-centered.is-dark.with-title#ending`)
        $gameover.append('<i class="nes-kirby"></i>');
};


/* 
TODO win function

once the players score reaches the length of the key-word * 100 
end the game with positive ending.
*/

const win = function() {
    const $keyWord = $('section .key-letter');
    const array = [];
    for(let i = 0; i < $keyWord.length; i++) {
        if(!array.includes($keyWord[i].innerText)) {
            array.push($keyWord[i].innerText);
        }
    }

    if(score === array.length * 100) {
      clearInterval(timer)
        $('body').empty();
        return $('body').append(`<div class="nes-container is-dark with-title id="ending">
        <p class="title">GAME OVER</p>
        <p>YOU'VE SAVED THE CITY!!!</p>
        </div>`);
    }
}



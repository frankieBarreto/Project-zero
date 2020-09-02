### User Stories/game logic

- When the user clicks the play icon the game should start, squares should populate with letter A-Z

- The Hint should appear above the buttons, empty underscores to the right-middle

- If the user clicks on the wrong letter it is X'd out red, if it is correct then the letter is shaded

- An image appears for every wrong guess (5 chances)

- Correct letters appear where they belong, removing the underscore

- If the user guesses incorrectly 5 times they lose

- every round gets harder(longer words);

- 3 rounds







-> the letters are <div>'s

-> the hint is an <h2> selected at random from the hint object {word:[hintArray]}?

-> score starts at 0. Every correct letter gets the player 100 points

-> the <img>'s are kept in a section inside <div>s appearing  every wrong clikced letter

-> every round the game resets(saving the score and choosing longer words);


MVP pitch
Hangman game in JavaScript

This is Hangman. A game where the player is given a word and has a couple of chances to guess the word one letter at a time.

The JS file will contain the bulk of the games logic. clicking , words obj, random word selector, all of the variables. The HTML sets up the basic elements of the game such as the title, pictures, text elements indicating progress and points, etc. The CSS is really the visual aspect of this project, giving the colors and margins. 



Stretch
-add audio button to toggle music on and off
-add a timer
-extra help button for another hint
nes.css
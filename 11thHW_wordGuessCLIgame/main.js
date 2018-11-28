const Word = require("./bin/Word.js");
const inq = require("inquirer");
const alph = "abcdefghijklmnopqrstuvwxyz".split('');
const clear = require("clear");
class Game {
  constructor() {
    this.word = new Word;
    this.tries = 8;
    this.play = function(arg) {
      return this.word.printer(arg);
    };
  };
};

inq.prompt([{
  name: 'choice',
  type: 'confirm',
  message: 'Hello, would you like to play a little hangman game?',
  default: "y"
}]).then((ans) => {
  clear();
  if (ans.choice) {
    let game = new Game;
    let playGame = function(arg) {
      let msg;
      if (arg) {
        clear();
        msg = `\r\nCannot enter non-letters or more than one character. Please try again\nTries Left: ${game.tries}\n${game.word.printer()}\n>`
      } else {clear();msg=`\r\nTries Left: ${game.tries}\n${game.word.printer()}\n>`}
      inq.prompt([{
        name: 'ansArg',
        type: 'input',
        message: msg
      }]).then(ans=>{
        ans.ansArg = ans.ansArg.toLowerCase();
        if (ans.ansArg.length > 1 || !(() => {
          for (var i = 0; i < alph.length; i++) {
            if (alph[i] == ans.ansArg) {
              return true;
              break;
            };
          };
        })()) {
          return playGame(true);
        };
        clear();
        game.word.guesser(ans.ansArg);
        let triesPlus = game.word.letters.map(e=>e[0].letter==ans.ansArg?1:0).reduce((a,e)=>a+=e);
        triesPlus==0?game.tries--:null;
        if (game.tries>0 && !game.word.allTrue()) {
          playGame();
        } else {
          if (game.word.allTrue()) {
            return console.log(`\n${game.word.chooser}\nYou won!`);
          } else {
            return console.log(`\nYou lose. The phrase was\n '${game.word.chooser}'`);
          };
        };
      });
    };
    playGame();
  } else {
    console.log("ok bye!!!");
  };
});

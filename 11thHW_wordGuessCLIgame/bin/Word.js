let Letter = require("./Letter.js");

let phrases = ["Jurassic Park", "San Antonio", "Ark of the Covenant", "Indiana Jones", "Avatar the Last Airbender", "Fatal Complications", "Wheel of Fortune"]

class Word {
  constructor() {
    this.chooser = phrases[Math.floor(Math.random()*phrases.length)].replace(/^.*/, e=>e.toLowerCase());
    this.letters = this.chooser.split('').map(function(e) {
      let results = [];
      if (e != ' ') {
        results.push(new Letter.Letter(e));
      } else {
        results.push(' ');
      };
      return results;
    });
    this.guesser = function(arg) {
      let results = this.letters.map(e=>{
        if (e[0] != ' ' && e[0].guessed == false) {
          return e[0].shower(arg);
        }
        else if (e[0].guessed == true) {
          return e[0].letter;
        }
        else {
          return ' ';
        };
      });
      return results;
    };
    this.printer = function() {
      return this.guesser('').join('');
    };
    this.allTrue = function() {
      let results = 0;
      for (var i = 0; i < this.letters.length; i++) {
        if (this.letters[i][0].guessed == true || this.letters[i][0] == ' ') {
          results++;
        }
      }
      if (results == this.letters.length) {
        return true;
      } else {
        return false;
      }
    };
  };
};

module.exports = Word;

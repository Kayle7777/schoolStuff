class Letter {
  constructor(arg) {
    this.letter = arg;
    this.guessed = false;
    this.shower = function(key) {
      if (key == this.letter) {
        this.guessed = true;
        return this.letter;
      } else {return "_"};
    };
  };
};

exports.Letter = Letter;

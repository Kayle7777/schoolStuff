document.body.addEventListener('keyup', function(event) {
  document.getElementById("lastLetter").innerHTML = event.key.toUpperCase();

  if (GameObject.badCharacters.includes(event.key)){/*If it DOES include something from badCharacters, do nothing*/}
  else{
    GameObject.triesLeft--;

    if (GameObject.triedLetters.includes(event.key.toUpperCase())) {
      if (GameObject.selectedWord.includes(event.key.toLowerCase())) {
      }else{GameObject.triesLeft++;};
    }else {GameObject.triedLetters.push(event.key.toUpperCase())
    };

    var kids = Array.from(document.getElementById("hiddenWord").children);

    //Check if you typed correct letter, only give one try back no matter how many letters uncovered
    var ifInc=0;
    for(var i=0;i<GameObject.selectedWord.length;i++){
      if(event.key == kids[i].id){
        kids[i].innerHTML=event.key.toUpperCase();ifInc++
      }
    };
    if(ifInc>0){
      GameObject.triesLeft++;
      ifInc=0;
    };

    // Game end conditions
    if (kids.map((x) => x.innerHTML).includes("_")) {}
    else{
      GameObject.gamesWon++;
      document.getElementById("lastWord").innerHTML = "*** " + GameObject.selectedWord.toUpperCase() + " ***";
      GameObject.initializeGame();
    };

    if (GameObject.triesLeft == 0) {
      GameObject.gamesLost++
      document.getElementById("lastWord").innerHTML = "*** " + GameObject.selectedWord.toUpperCase() + " ***";
      GameObject.initializeGame();
    };

    GameObject.updateHTML();
  };
}, false);


GameObject = {
  words : {
    //Gonna set up hints
    "Zombie":"Test1",
    "Vampire":"Test2",
    "Dungeons":"Test3",
    "Dragons":"Test4",
    "Wizard":"Test5",
    "Knight":"Test6",
    "Gandalf":"Test7",
    "Sarumon":"Test8",
    "Anduril":"Test9",
    "Ringwraith":"Test10",
    "Frodo":"Test10",
    "Fighter":0,
    "Rogue":0,
    "Warlock":0,
    "Minotaur":0,
    "Labyrinth":0,
    "Sauron":0,
    "Legolas":0
  },
  badCharacters: ['Control', 'Meta', ' ',',', '.', ';', "Alt", "Shift", "CapsLock", "Enter", "/", "\\", "[", "]", "(", ")", "Backspace", "=", "-", "'", "Tab"],
  totalGames : 0,
  triesLeft : 0,
  gamesWon : 0,
  gamesLost : 0,
  triedLetters: [],

  updateHTML: function() {
    // NOTE: triesLeft updateHTML
    document.getElementById("triesLeft").innerHTML = this.triesLeft;
    // NOTE: triedLetters updateHTML
    document.getElementById("triedLetters").innerHTML = this.triedLetters.join(" ");
    // NOTE: totalGames updateHTML
    document.getElementById("totalGames").innerHTML = this.totalGames;
    // NOTE: gamesWon updateHTML
    document.getElementById("gamesWon").innerHTML = this.gamesWon;
    // NOTE: gamesLost updateHTML
    document.getElementById("gamesLost").innerHTML = this.gamesLost;
  },

  initializeGame: function() {
    this.totalGames++;
    this.selectedWord = Object.keys(this.words)[Math.floor(Math.random() * Object.keys(this.words).length)].toLowerCase()
    this.triedLetters = [];
    this.triesLeft = this.selectedWord.length + (Math.floor(Math.random() * 3))

    var hiddenWord = document.getElementById("hiddenWord");
    hiddenWord.innerHTML = "";
    for(i=0;i<this.selectedWord.length;i++) {
      var newSpan = document.createElement('span');
      var textNode = document.createTextNode("_");
      newSpan.setAttribute("id",this.selectedWord[i].toLowerCase());
      newSpan.setAttribute("class", "hiddenWordClass");
      newSpan.appendChild(textNode);
      hiddenWord.appendChild(newSpan);
    }
    this.updateHTML();
  }
}

GameObject.initializeGame()

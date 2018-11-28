CrystalGame = {
  buttons: $("#buttons").children(),
  goalNumber: 0,
  playerScore: 0,
  wins: 0,
  losses: 0,
  gameFunc: function() {
    //Win and Lose conditions
    if (this.playerScore >= this.goalNumber) {
      if (this.playerScore == this.goalNumber) {
        this.wins++;
        $("#wins").html("Wins: " + this.wins);
      }else {
        this.losses++;
        $("#losses").html("Losses: " + this.losses);
      }
      this.gameInit();
    }
    //If game not lost or won, keep updating playerScore html
    $("#playerScore").html(this.playerScore);
  },
  gameInit: function() {
    // Game reset function -- pick new numbers for buttons and goal
    this.goalNumber = Math.floor(Math.random() * 102) + 19;
    this.playerScore = 0;
    $("#randomNumber").html(this.goalNumber);
    $("#playerScore").html(this.playerScore);
    $.map(this.buttons, (element) => {
        element.randNumber = Math.floor(Math.random() * 12) + 1;
    });
  }
}

// First time game initialization
CrystalGame.gameInit();
$("#wins").html("Wins: " + CrystalGame.wins);
$("#losses").html("Losses: " + CrystalGame.losses);


// On click listener
$.map(CrystalGame.buttons, (element) => {
  $(element).on('click', () => {
    //For cheating
    console.log(element.randNumber);
    //On each button click, run game function.
    CrystalGame.playerScore += element.randNumber
    CrystalGame.gameFunc();
  })
})

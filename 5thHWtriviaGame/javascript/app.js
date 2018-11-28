questionObjects = [
  {
    question: "Who possesses the ring of power at the start of the Trilogy of The Lord of the Rings?",
    wrong1: "Gandalf",
    wrong2: "Sauron",
    wrong3: "Frodo",
    right: "Bilbo"
  },
  {
    question: "Who do the hobbits encounter at the Prancing Pony Inn?",
    wrong1: "Gandalf",
    wrong2: "Legolas",
    wrong3: "Boromir",
    right: "Strider"
  },
  {
    question: "How many members make up the fellowship of the ring?",
    wrong1: "Seven",
    wrong2: "Eight",
    wrong3: "Ten",
    right: "Nine"
  },
  {
    question: "What is the name of the only kin of the fair folk in the fellowship of the ring?",
    wrong1: "Gimli",
    wrong2: "Meriadoc",
    wrong3: "Boromir",
    right: "Legolas"
  },
  {
    question: "Who is the first member of the fellowship to be separated from the group?",
    wrong1: "Legolas",
    wrong2: "Boromir",
    wrong3: "Aragorn",
    right: "Gandalf"
  },
  {
    question: "Who follows Sam and Frodo the longest, from the journey's start at Rivendell, to the mountain of doom?",
    wrong1: "Aragorn",
    wrong2: "Gandalf",
    wrong3: "Sarumon",
    right: "Gollum"
  },
  {
    question: "Where did did the Numenorian king Elendil and the Elven king Gil-Galad fall, in the war against Sauron?",
    wrong1: "Outside Minas Tirith, city of Gondor",
    wrong2: "In the Dome of Stars, in Osgiliath",
    wrong3: "The Pelennor Fields",
    right: "The Gladden Fields"
  },
  {
    question: "Who kills the Witch-King, leader of the nine ringwraiths, in the battle of the Pelennor fields?",
    wrong1: "Pippin",
    wrong2: "Aragorn",
    wrong3: "Th\351oden",
    right: "\311owyn"
  },
  {
    question: "Gimli the dwarf becomes deeply fascinated by something he finds under Helm's Deep. What is it?",
    wrong1: "Cirrith Ungol",
    wrong2: "Khazad-d\372m",
    wrong3: "Erebor",
    right: "The Glittering Caves"
  },
  {
    question: "Who eventually departs for the elven lands, at the trilogy's conclusion?",
    wrong1: "Bilbo",
    wrong2: "Frodo",
    wrong3: "Gandalf",
    right: "All of the Above"
  },
  {
    question: "Treebeard the ent is fascinated with Merry and Pippin's stories about the shire, why?",
    wrong1: "He enjoys the hobbits' descriptions of the flowers",
    wrong2: "He wants to go and live in the forests there",
    wrong3: "He thinks the hobbits are making it up, because he doesn't know there is any other forest than his own",
    right: "He thinks there is a chance the Entwives might be there, because it sounds like a place they would like"
  }

];


class Question {
  constructor(obj = questionObjects[Math.floor(Math.random() * questionObjects.length)]) {
    this.question = obj.question;
    this.choices = [{name:obj.wrong1, value:false}, {name:obj.wrong2, value:false}, {name:obj.wrong3, value:false}, {name:obj.right, value:true}]
    shuffle(this.choices);
  }
}


let timeInterval;
let timeRemainingDiv = document.getElementById("timeRemaining")
function startTimer() {
  timeInterval = setInterval(() => {
    timer--;
    timeRemainingDiv.innerHTML = `<strong>${timeConverter(timer)}</strong>`;
    if (timer == 0) {
      timeRemainingDiv.innerHTML = `<strong><span>${timer} Time's up! <strong></span>`
      clearInterval(timeInterval);
      setTimeout(gameFunction, 2500);
    };
  }, 1000)
}

// ===================================================================================
let timer, questionDiv = document.getElementById("question"), answerDiv = document.getElementById("answerChoices");
function gameFunction() {
  timer = 15;
  document.getElementById("timeRemaining").innerHTML = `<strong>${timeConverter(timer)}</strong>`;
  clearInterval(timeInterval);
  startTimer();
// ===================================================================================
  QuestionObject = new Question;
  questionDiv.innerHTML = QuestionObject.question;
// ===================================================================================
  // This makes buttons dynamic with values of true or false for correct or incorrect
  answerDiv.innerHTML = "";

  let buttonMaker = QuestionObject.choices.map((x) => {
    let textNode = document.createTextNode(x.name);
    let newButton = document.createElement('button');
    let br = document.createElement('br');
  // ===================================================================================
    // Put button functionality here
    newButton.onclick = () => {
      console.log(x.value)
      if(x.value) {
        timeRemainingDiv.innerHTML = `<span><strong>${timeConverter(timer)} Right! You win!! <strong></span>`
        clearInterval(timeInterval);
        setTimeout(gameFunction, 2500);
      }else {
        timeRemainingDiv.innerHTML = `<span><strong>${timeConverter(timer)} Wrong! You lose!! <strong></span>`
        clearInterval(timeInterval);
        setTimeout(gameFunction, 2500);
      }
      // To prevent clicking buttons too many times, and running the functions too much before gameFunction starts.
      Array.from(answerDiv.children).map((x) => {x.onclick =() => null})
    }
  // ===================================================================================
    newButton.setAttribute("value", x.value);
    newButton.setAttribute("class", "buttonClass col-md-3 justify-content-around");
    newButton.appendChild(textNode);
    answerDiv.appendChild(newButton);
    answerDiv.appendChild(br);
  })
}

// First time game initialization
gameFunction();


// ===================================================================================
  // Borrowed code
function timeConverter(t) {
  //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return seconds;
}

// Fisher-Yates shuffler for shuffling my choices array

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

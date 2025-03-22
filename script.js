let userScore = 0;
let compScore = 0;
let maxRounds = 3;
let roundsPlayed = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const historyList = document.querySelector("#history");
const resetBtn = document.querySelector("#reset");
const roundsSelect = document.querySelector("#rounds");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
  checkGameOver();
};

const showWinner = (userWin, userChoice, compChoice) => {
  roundsPlayed++;
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
  updateHistory(userChoice, compChoice, userWin);
  checkGameOver();
};

const playGame = (userChoice) => {
  if (roundsPlayed >= maxRounds) return; // Stop game if max rounds reached

  const compChoice = genCompChoice();

  choices.forEach((choice) => choice.classList.remove("selected"));
  document.getElementById(userChoice).classList.add("selected");
  document.getElementById(compChoice).classList.add("selected");

  if (userChoice === compChoice) {
    drawGame();
  } else {
    const winningCombos = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper",
    };
    showWinner(winningCombos[userChoice] === compChoice, userChoice, compChoice);
  }
};

const updateHistory = (userChoice, compChoice, userWin) => {
  const li = document.createElement("li");
  li.innerText = `Round ${roundsPlayed}: You chose ${userChoice}, Computer chose ${compChoice} - ${userWin ? "Win" : "Loss"}`;
  historyList.prepend(li);
};

const checkGameOver = () => {
  if (roundsPlayed >= maxRounds) {
    if (userScore > compScore) {
      msg.innerText = "Congratulations! You won the series!";
      msg.style.backgroundColor = "gold";
    } else if (compScore > userScore) {
      msg.innerText = "Game Over! Computer wins the series!";
      msg.style.backgroundColor = "darkred";
    } else {
      msg.innerText = "Series Draw! Play again.";
      msg.style.backgroundColor = "#081b31";
    }
  }
};

roundsSelect.addEventListener("change", () => {
  maxRounds = parseInt(roundsSelect.value);
  resetGame();
});

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playGame(choice.getAttribute("id"));
  });
});

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  userScore = 0;
  compScore = 0;
  roundsPlayed = 0;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  historyList.innerHTML = "";
}

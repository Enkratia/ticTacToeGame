const selectBox = document.querySelector(".select-box"),
  selectXBtn = selectBox.querySelector(".playerX"),
  selectOBtn = selectBox.querySelector(".playerO"),
  playBoard = document.querySelector(".play-board"),
  allBox = document.querySelectorAll("section span"),
  players = document.querySelector(".players"),
  resultBox = document.querySelector(".result-box"),
  wonText = resultBox.querySelector(".won-text"),
  replayBtn = resultBox.querySelector("button");

for (let i = 0; i < allBox.length; i++) {
  allBox[i].setAttribute("onclick", "clickedBox(this)")
}

selectXBtn.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
}
selectOBtn.onclick = () => {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  players.setAttribute("class", "players active player")
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
  playerSign = "X";
  if (players.classList.contains("player")) {
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.remove("active");
    playerSign = "O";
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  }
  selectWinner();
  playBoard.style.pointerEvents = "none";
  element.style.pointerEvents = "none";
  randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
  setTimeout(() => {
    bot(runBot);
  }, randomDelayTime);

}

function bot(runBot) {
  if (runBot) {
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount === 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      if (players.classList.contains("player")) {
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        playerSign = "X";
        allBox[randomBox].setAttribute("id", playerSign);
      } else {
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        allBox[randomBox].setAttribute("id", playerSign);
      }
      selectWinner();
      allBox[randomBox].style.pointerEvents = "none";
      playBoard.style.pointerEvents = "auto";
    }
  }
}

// select the winner
function getClass(idname) {
  return document.querySelector(".box" + idname).id;
}

function checkClass(val1, val2, val3, sign) {
  if (getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign) {
    return true;
  }
}

function selectWinner() {
  if (checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)) {
    runBot = false;

    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
      wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }, 700);
  } else {
    if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
      runBot = false;

      setTimeout(() => {
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
        wonText.textContent = "Match has been drawn!";
      }, 700);
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload();
}
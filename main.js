const gameStart = document.querySelector(".game__button");
const timeText = document.querySelector(".game__timer");
const levelText = document.querySelector(".game__level");
const gameField = document.querySelector(".game__field");
const fieldWidth = gameField.getBoundingClientRect();
const message = document.querySelector(".pop-up__message");

const popUp = document.querySelector(".pop-up");
const popUpBtn = popUp.querySelector(".pop-up__refresh");

const ALIEN__WIDTH = 80;
const ALIEN__HEIGHT = 80;
const APPEAR__SPEED = 1500;

const alienSound = new Audio("./sound/death.wav");
const bgSound = new Audio("./sound/bg.mp3");
const failSound = new Audio("./sound/fail.mp3");
const successSound = new Audio("./sound/success.mp3");

let duration = 10;
let level = 1;
let speed = APPEAR__SPEED;
let started = false;

let repeat;
let timer;

gameStart.addEventListener("click", () => {
  if (started) {
    stopGame(`${level} 단계에서 실패!.`);
  } else {
    startGame();
    playToggle();
  }
});

function stopGame(win) {
  gameField.innerHTML = "";
  stopSound(bgSound);
  clearInterval(repeat);
  clearInterval(timer);
  hiddenPlayBtn();
  gameFinishBanner(win);
}

function startGame() {
  initGame();
  showPlayBtn();
  startGameTimer();
}

function playToggle() {
  let icon = gameStart.querySelector(".fa-solid");
  if (started) {
    icon.classList.remove("fa-stop");
    icon.classList.add("fa-play");
  } else {
    icon.classList.remove("fa-play");
    icon.classList.add("fa-stop");
  }
  started = !started;
}

function initGame() {
  const img = document.createElement("img");
  img.className = "alien";
  img.src = "img/alien.png";
  repeat = setInterval(() => {
    let [x, y] = randomNumber();
    let imgClone = img.cloneNode(img);
    imgClone.style.transform = `translate(${x}px,${y}px)`;
    gameField.appendChild(imgClone);
  }, speed);
}

function startGameTimer() {
  let timeLimit = duration;
  timeText.textContent = timeLimit;
  timer = setInterval(() => {
    timeLimit--;
    timeText.textContent = timeLimit;

    if (timeLimit <= 0) {
      stopGame("다음 단계");
    }
  }, 1000);
}

function gameFinishBanner(win) {
  showPopUp();
  const reset = "fa-arrow-rotate-right";
  const next = "fa-angles-right";
  message.textContent = win;
  if (popUp.matches(".pop-up--hidden")) {
    popUp.classList.remove("pop-up--hidden");
  }
  if (win === "다음 단계") {
    playSound(successSound);
    resultGame(reset, next);
  } else {
    playSound(failSound);
    resultGame(next, reset);
  }
}

function resultGame(del, make) {
  let icon = popUp.querySelector(".fa-solid");
  if (speed < 500 && del === "fa-arrow-rotate-right") {
    message.textContent = "마지막 단계 성공!🎉";
    icon.classList.remove(make);
    icon.classList.add(del);
    return;
  }
  icon.classList.remove(del);
  icon.classList.add(make);
}

function hiddenPlayBtn() {
  gameStart.style.visibility = "hidden";
}

function showPlayBtn() {
  gameStart.style.visibility = "visible";
}

function nextLevel(floor) {
  if (speed > 700) {
    speed -= 300;
  } else {
    speed -= 200;
  }
  floor.textContent = ++level;
  startGame();
  showPopUp();
}

function restart(floor) {
  speed = APPEAR__SPEED;
  level = 1;
  floor.textContent = level;
  startGame();
  showPopUp();
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
function showPopUp() {
  popUp.classList.toggle("pop-up--hidden");
}

function randomNumber() {
  let x = Math.floor(Math.random() * (fieldWidth.width - ALIEN__WIDTH));
  let y = Math.floor(Math.random() * (fieldWidth.height - ALIEN__HEIGHT));
  return [x, y];
}

gameField.addEventListener("click", (e) => {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  playSound(alienSound);
  e.target.remove();
});

gameField.addEventListener("animationend", () => {
  stopGame(`${level} 단계에서 실패!`);
});

popUpBtn.addEventListener("click", (e) => {
  let check = e.currentTarget.children[0].matches(".fa-arrow-rotate-right");
  let floor = levelText.querySelector(".game__level-text");
  if (check) {
    restart(floor);
  } else {
    nextLevel(floor);
  }
});

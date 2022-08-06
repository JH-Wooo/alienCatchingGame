import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

export default class GameBuilder {
  gameTimeDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  gameTimeSpeed(speed) {
    this.gameSpeed = speed;
    return this;
  }
  build() {
    return new Game(this.gameDuration, this.gameSpeed);
  }
}

class Game {
  constructor(gameDuration, gameSpeed) {
    this.gameStart = document.querySelector(".game__button");
    this.levelText = document.querySelector(".game__level-text");
    this.timeText = document.querySelector(".game__timer");

    this.APPEAR__SPEED = gameSpeed;

    this.duration = gameDuration;
    this.speed = this.APPEAR__SPEED;
    this.level = 1;
    this.started = false;

    this.gameStart.addEventListener("click", () => {
      if (this.started) {
        sound.playFail();
        this.stopGame(`${this.level} 단계에서 실패!.`);
      } else {
        this.startGame();
        this.playToggle();
      }
    });
    this.field = new Field();
    this.gameBanner = new PopUp();
    this.field.setAnimationListener(() => {
      sound.playFail();
      this.stopGame();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  startGame = () => {
    this.gameSpeed();
    sound.playBackground();
    this.field.initGame(this.speed);
    this.showPlayBtn();
    this.startGameTimer();
  };

  stopGame(win = `${this.level} 단계에서 실패!.`) {
    this.field.gameField.innerHTML = "";
    sound.stopBackground();
    this.field.clearAlien();
    clearInterval(this.timer);
    this.hiddenPlayBtn();
    this.gameBanner.gameFinishBanner(win, this.speed);
  }

  playToggle() {
    let icon = this.gameStart.querySelector(".fa-solid");
    icon.classList.remove("fa-play");
    icon.classList.add("fa-stop");
    this.started = !this.started;
  }

  gameSpeed() {
    if (this.speed > 700) {
      this.speed -= 300;
    } else {
      this.speed -= 100;
    }
  }

  restart = () => {
    this.speed = this.APPEAR__SPEED;
    this.level = 1;
    this.levelText.textContent = this.level;
    this.startGame();
  };

  nextLevel = () => {
    this.levelText.textContent = ++this.level;
    this.startGame();
  };

  startGameTimer() {
    let timeLimit = this.duration;
    this.timeText.textContent = timeLimit;
    this.timer = setInterval(() => {
      timeLimit--;
      this.timeText.textContent = timeLimit;
      if (timeLimit <= 0) {
        sound.playSuccess();
        this.stopGame("다음 단계");
      }
    }, 1000);
  }

  showPlayBtn() {
    this.gameStart.style.visibility = "visible";
  }
  hiddenPlayBtn() {
    this.gameStart.style.visibility = "hidden";
  }
}

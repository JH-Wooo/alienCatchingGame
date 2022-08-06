import * as sound from "./sound.js";

const ALIEN__WIDTH = 80;
const ALIEN__HEIGHT = 80;

export default class Field {
  constructor() {
    this.gameField = document.querySelector(".game__field");
    this.fieldWidth = this.gameField.getBoundingClientRect();
    this.repeat;

    this.gameField.addEventListener("animationend", () => {
      this.onAnimation && this.onAnimation();
    });
    this.gameField.addEventListener("click", this.onClick);
  }

  setAnimationListener(onAnimation) {
    this.onAnimation = onAnimation;
  }

  initGame(speed) {
    const img = document.createElement("img");
    img.className = "alien";
    img.src = "img/alien.png";
    this.repeat = setInterval(() => {
      let [x, y] = this.randomNumber();
      let imgClone = img.cloneNode(img);
      imgClone.style.transform = `translate(${x}px,${y}px)`;
      this.gameField.appendChild(imgClone);
    }, speed);
  }

  onClick = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    sound.playAlien();
    e.target.remove();
  };

  randomNumber() {
    let x = Math.floor(Math.random() * (this.fieldWidth.width - ALIEN__WIDTH));
    let y = Math.floor(
      Math.random() * (this.fieldWidth.height - ALIEN__HEIGHT)
    );
    return [x, y];
  }

  clearAlien() {
    clearInterval(this.repeat);
  }
}

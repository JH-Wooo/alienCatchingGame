export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpBtn = this.popUp.querySelector(".pop-up__refresh");
    this.message = document.querySelector(".pop-up__message");
    this.levelText = document.querySelector(".game__level");
    this.popUpBtn.addEventListener("click", (e) => {
      let check = e.currentTarget.children[0].matches(".fa-arrow-rotate-right");
      this.hiddenPopUp();
      if (check) {
        this.onRestart && this.onRestart();
      } else {
        this.onNext && this.onNext();
      }
    });
  }

  setRestartClickListener(onRestart) {
    this.onRestart = onRestart;
  }
  setNextClickListener(onNext) {
    this.onNext = onNext;
  }
  showPopUp() {
    popUp.classList.toggle("pop-up--hidden");
  }

  gameFinishBanner(win, speed) {
    this.showPopUp();
    const reset = "fa-arrow-rotate-right";
    const next = "fa-angles-right";
    this.message.textContent = win;
    if (win === "다음 단계") {
      this.resultGame(reset, next, speed);
    } else {
      this.resultGame(next, reset, speed);
    }
  }

  showPopUp = () => {
    this.popUp.classList.toggle("pop-up--hidden");
  };

  hiddenPopUp() {
    this.popUp.classList.add("pop-up--hidden");
  }
  resultGame(del, make, speed) {
    let icon = this.popUp.querySelector(".fa-solid");
    if (speed < 500 && del === "fa-arrow-rotate-right") {
      this.message.textContent = "마지막 단계 성공!🎉";
      icon.classList.remove(make);
      icon.classList.add(del);
      return;
    }
    icon.classList.remove(del);
    icon.classList.add(make);
  }
}

const alienSound = new Audio("./sound/death.wav");
const bgSound = new Audio("./sound/bg.mp3");
const failSound = new Audio("./sound/fail.mp3");
const successSound = new Audio("./sound/success.mp3");

export function playAlien() {
  playSound(alienSound);
}

export function playBackground() {
  playSound(bgSound);
}
export function playFail() {
  playSound(failSound);
}
export function playSuccess() {
  playSound(successSound);
}
export function stopBackground() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

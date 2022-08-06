import PopUp from "./popup.js";
import GameBuilder from "./game.js";

const WITHSTAND__TIME = 5;
const APPEAR__SPEED = 1200;

const game = new GameBuilder()
  .gameTimeDuration(WITHSTAND__TIME)
  .gameTimeSpeed(APPEAR__SPEED)
  .build();

const gameBanner = new PopUp();

gameBanner.setRestartClickListener(() => {
  game.restart();
});
gameBanner.setNextClickListener(() => {
  game.nextLevel();
});

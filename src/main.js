'use strict';

import PopUp from './pop-up.js';
import * as sound from './sound.js';
import {GameBuilder, Reason} from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.withGameDuration(30)
.withCarrotCount(15)
.withBugCount(10)
.build();

game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch(reason) {
        case Reason.cancel:
            message = 'REPLAY❓';
            sound.playAlert();
            sound.stopBackground();
            break;
        case Reason.win:
            message = 'YOU WON✨';
            sound.playWin();
            sound.stopBackground();
            break;
        case Reason.lose:
            message = 'YOU LOST👎';
            sound.playBug();
            sound.stopBackground();
            break;
        default:
            throw new Error('not valid reason');

    }

    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});




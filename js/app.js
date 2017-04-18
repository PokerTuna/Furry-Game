var Game = require("./game.js");


var game = new Game();
game.startGame();

document.addEventListener('keydown', function(e) {
    game.turnFurry(e);
});

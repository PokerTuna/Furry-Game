var Coin = require("./coin.js");
var Furry = require("./furry.js");
var Pond = require("./pond.js");
var Fox = require("./fox.js");
var Tree = require("./tree.js");

var Game = function() {
    this.board = document.querySelectorAll("#board div");
    this.result = document.querySelector(".gameOn div strong");
    this.furry = new Furry();
    this.coin = new Coin();
    this.pond = new Pond();
    this.fox = new Fox();
    this.tree = new Tree();
    this.score = 0;
    this.carrotCounter = 0;

    this.index = function(x, y) {
        return x + (y * 10);
    }
    this.showFurry = function() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    }
    this.hideVisibleFurry = function() {
        this.pastFurry = document.querySelector(".furry");
        this.pastFurry.classList.remove("furry");
    }
    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    }
    this.showPond = function() {
        this.board[this.index(this.pond.x, this.pond.y)].classList.add("pond");
    }
    this.showFox = function() {
        this.board[this.index(this.fox.x, this.fox.y)].classList.add("fox");
    }
    this.showTree = function() {
        this.board[this.index(this.tree.x + 1, this.tree.y + 1)].classList.add("tree");
        this.board[this.index(this.tree.x, this.tree.y + 7)].classList.add("tree");
        this.board[this.index(this.tree.x + 6, this.tree.y)].classList.add("tree");
        this.board[this.index(this.tree.x + 8, this.tree.y + 8)].classList.add("tree");
        this.board[this.index(this.tree.x, this.tree.y + 7)].classList.add("tree");
        this.board[this.index(this.tree.x + 6, this.tree.y)].classList.add("tree");
    }
    this.moveFurry = function() {
        var self = this.furry;
        if (self.direction === "right") {
            self.x = self.x + 1;
        } else if (self.direction === "left") {
            self.x = self.x - 1;
        } else if (self.direction === "top") {
            self.y = self.y - 1;
        } else if (self.direction === "bottom") {
            self.y = self.y + 1;
        }
        if (this.gameOver() === false) {
            this.hideVisibleFurry();
            this.showFurry();
            this.checkCoinCollision();
            this.checkFoxCollision();
        }
    }
    this.turnFurry = function(e) {
        switch (e.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 38:
                this.furry.direction = "top";
                break;
            case 40:
                this.furry.direction = "bottom";
                break;
        }
    }
    this.checkCoinCollision = function() {
        var self = this;
        self.hideCoin = document.querySelector(".coin");

        if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
            this.audio = document.querySelector('#eat').play();
            this.hideCoin.classList.remove('coin');
            this.hideCoin.classList.add('furry');
            this.score = this.score + 4;
            this.result.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
            this.carrotCounter += 1;
        }
    }

    this.checkFoxCollision = function() {
        var self = this;
        self.hideFox = document.querySelector(".fox");

        if ((this.furry.x === this.fox.x) && (this.furry.y === this.fox.y)) {
            this.hideFox.classList.remove("fox");
            this.score -= 3;
            this.result.innerText = this.score;
            this.fox = new Fox();
            this.showFox();
        }
    }
    this.gameOver = function() {

        if (((this.furry.x > 9) || (this.furry.x < 0) || (this.furry.y > 9) || (this.furry.y < 0)) ||
            ((this.furry.x === this.pond.x) && (this.furry.y === this.pond.y)) || this.score < 0) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            this.gameOver = document.querySelector(".gameOn");
            this.gameOver.classList.add("fin");
            this.gameOver.innerText = "GAME OVER \n \n" + "your score: " + this.score;
            this.fade = document.getElementById("board").classList.add("fade");
            return true;
        } else if (this.score>31){
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            this.gameOver = document.querySelector(".gameOn");
            this.gameOver.classList.add("fin");
            this.gameOver.innerText = "YOU DID IT! \n \n" + "your score: " + this.score;
            this.fade = document.getElementById("board").classList.add("fade");
            this.gameInfo = document.querySelector(".gameInfo").classList.add("fade");
            return true;
        } else {
            return false;
        }
    }
    this.startGame = function() {
        this.showFurry();
        this.showCoin();
        this.showFox();
        this.showTree();
        this.showPond();
        var self = this;
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 400);
    }
}
module.exports = Game;

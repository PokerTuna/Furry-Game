/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Coin = __webpack_require__(2);
var Furry = __webpack_require__(4);
var Pond = __webpack_require__(5);
var Fox = __webpack_require__(3);
var Tree = __webpack_require__(6);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(0);


var game = new Game();
game.startGame();

document.addEventListener('keydown', function(e) {
    game.turnFurry(e);
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Coin = function() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}
module.exports = Coin;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Fox = function() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}
module.exports = Fox;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var Furry = function() {
    this.x = 0;
    this.y = 7;
    this.direction = "right";
}
module.exports = Furry;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var Pond = function() {
    this.x = Math.floor(Math.random() * 5);
    this.y = Math.floor(Math.random() * 5);
}

module.exports = Pond;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var Tree = function() {
    this.x = 1;
    this.y = 1;
}
module.exports = Tree;


/***/ })
/******/ ]);
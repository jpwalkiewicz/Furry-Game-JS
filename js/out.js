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
var Furry = __webpack_require__(3);


var Game = function() {
    this.board = document.querySelectorAll("#board div");
    this.scoreBoard = document.querySelector("#score div strong");
    this.gameOverScore = document.querySelector("#score div");
    this.furry = new Furry();
    this.gameEnd = false;
    this.coin = new Coin();
    this.score = 0;
    this.interval = 200;
    this.index = function(x, y) {
        return x + (y * 10);
    }

    this.showFurry = function() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }

    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.startGame = function() {
        var self = this;
        this.idSetInterval = setInterval(function() {

            self.moveFurry();
        }, self.interval);
    }

    this.moveFurry = function() {
        var self = this.furry;

        if (self.direction === "right") {
            self.x += 1;
        } else if (self.direction === "left") {
            self.x -= 1;
        } else if (self.direction === "down") {
            self.y += 1;
        } else if (self.direction === "up") {
            self.y -= 1;
        }
        this.gameOver();
        if (this.gameEnd == false) {
            this.hideVisibleFurry();
            this.checkCoinCollision();
            this.showFurry();
        }
    }

    this.hideVisibleFurry = function() {
        this.div = document.querySelector('.furry');
        this.div.classList.remove('furry');
    }

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;
        }
    }

    this.checkCoinCollision = function() {
        var self = this;
        this.coinStyle = document.querySelector('.coin');
        if ((this.coin.x == this.furry.x) && (this.coin.y == this.furry.y)) {
            this.score += 1
            this.scoreBoard.innerText = this.score;
            this.coinStyle.classList.remove('coin');
            this.coinStyle.classList.add('furry');
            this.coin = new Coin();
            this.showCoin();
            clearInterval(this.idSetInterval);
            self.interval -= 5;
            this.startGame();

        }
    }

    this.gameOver = function() {
        this.boardGame = document.getElementById("board");

        if ((this.furry.x > 9) || (this.furry.x < 0) || (this.furry.y > 9) || (this.furry.y < 0)) {
            console.log("!!! GAME OVER !!!");
            clearInterval(this.idSetInterval);
            this.gameEnd = true;
            this.boardGame.style.display = "none";
            this.gameOverScore.innerHTML = "<strong>GAME OVER</strong>, uzyskano " + this.score + " pkt.";

        }
    }
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var Game = __webpack_require__(0);


var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();


document.addEventListener('keydown', function(event) {
    game.turnFurry(event);
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

var Furry = function() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}

module.exports = Furry;


/***/ })
/******/ ]);
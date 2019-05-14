const canvas = document.getElementById("myCanvas");
const scoreDiv = document.getElementById("score");
const bestScoreDiv = document.getElementById("bestScore");
const ctx = canvas.getContext("2d");
ctx.canvas.height = 500;
ctx.canvas.width = 500;

let score = 0;
let bestScore = 0;
let freeSpaceY = ctx.canvas.height;
let xAxcis = 1;
let yAxcis = 0;
let blockMove = "l";
const numberOfRect = 25;
const rand = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
const canvasWidth = ctx.canvas.width;
const bok = canvasWidth / numberOfRect;

let snake = [{
    x: 10,
    y: 10
}, {
    x: 9,
    y: 10
}, {
    x: 8,
    y: 10
}, {
    x: 7,
    y: 10
}];

let foodX = rand(0, numberOfRect);
let foodY = rand(0, numberOfRect);
let eaten = false;
let xLast;
let yLast;
let turn = true;

function drowSnake() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const Part of snake) {
        drowPart(Part);
    }
    snake.pop();
    newHead();
    xLast = snake[snake.length - 1].x;
    yLast = snake[snake.length - 1].y;
}

function newHead() {
    snake.unshift({
        x: snake[0].x + xAxcis,
        y: snake[0].y + yAxcis
    })
};

function addPart() {
    snake.push({
        x: xLast,
        y: yLast
    })

}

function reset() {
    snake = [{
        x: 10,
        y: 10
    }, {
        x: 9,
        y: 10
    }, {
        x: 8,
        y: 10
    }, {
        x: 7,
        y: 10
    }];
    xAxcis = 1;
    yAxcis = 0;
    blockMove = "l";
    eaten = false;
    if (score > bestScore) {
        bestScore = score;
    }
    bestScoreDiv.innerHTML = "Best Score: " + bestScore;

    score = 0;
}

function eatYourTail() {
    for (let index = 1; index < snake.length; index++) {
        const part = snake[index];
        if (part.x == snake[0].x && part.y == snake[0].y) {
            reset();
        }
    }
};

function drowPart(snakePart) {
    ctx.fillStyle = `rgb(134,12,32)`;
    ctx.fillRect(snakePart.x * bok, snakePart.y * bok, bok, bok);
}

function hitWall(x, y) {
    // if (x < 0 || x >= numberOfRect || y < 0 || y >= canvas.height / bok) {
    //     reset();

    // }
    if (x < 0) {
        snake[0].x = numberOfRect;
    } else if (x >= numberOfRect) {
        snake[0].x = 0;
    } else if (y < 0) {
        snake[0].y = canvas.height / bok;
    } else if (y >= canvas.height / bok) {
        snake[0].y = 0;
    }

}

function drowFood() {

    if (eaten) {
        foodX = rand(0, numberOfRect - 1);
        foodY = rand(0, numberOfRect - 1);
        eaten = false;
    }
    ctx.fillStyle = "green";
    ctx.fillRect(foodX * bok, foodY * bok, bok, bok);


}

function eatFood() {
    if (foodX == snake[0].x && foodY == snake[0].y) {
        addPart();
        score++;
        scoreDiv.innerHTML = "Score: " + score;
        eaten = true;
    }
}
setInterval(() => {
    hitWall(snake[0].x, snake[0].y);
    eatYourTail();
    drowSnake();
    drowFood();
    eatFood();
    turn = true;
}, 100);



window.addEventListener("keydown", function (event) {
    if (event.keyCode == 40) {
        if (blockMove != "d" && turn) {
            xAxcis = 0;
            yAxcis = 1;
            blockMove = "u";
            turn = false;
        }

    } else if (event.keyCode == 38) {
        if (blockMove != "u" && turn) {
            xAxcis = 0;
            yAxcis = -1;
            blockMove = "d";
            turn = false;
        }
    } else if (event.keyCode == 37) {
        if (blockMove != "l" && turn) {
            xAxcis = -1;
            yAxcis = 0;
            blockMove = "r";
            turn = false;
        }
    } else if (event.keyCode == 39) {
        if (blockMove != "r" && turn) {
            xAxcis = 1;
            yAxcis = 0;
            blockMove = "l";
            turn = false;
        }
    }
});
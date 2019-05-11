const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");
ctx.canvas.height = window.innerHeight * 0.98;
ctx.canvas.width = window.innerWidth * 0.98;

let freeSpaceY = ctx.canvas.height;

let y = 0;
const numberOfRect = 50;
const rand = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
const canvasWidth = ctx.canvas.width;
const bok = canvasWidth / numberOfRect;

for (let x = 0; x < numberOfRect; x++) {
    while (freeSpaceY >= bok) {
        console.log(y);
        const color = rand(0, 255);
        ctx.fillStyle = "rgb(" + color + ", " + color + ", " + color + ")";
        ctx.fillRect(x * bok, y * bok, bok, bok);
        freeSpaceY = freeSpaceY - bok;
        y++;

    }
    y = 0;
    freeSpaceY = ctx.canvas.height;
}

ctx.fillStyle = "rgb(" + 255 + ", " + 0 + ", " + 0 + ")";
let xx = 0;
setInterval(() => {
    ctx.fillRect(xx * bok, 10 * bok, bok, bok);
    xx++;
    console.log(xx);
}, 500);
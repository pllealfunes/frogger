"use strict"

var myForm = document.forms[0];
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');
var xPos = 210;
var yPos = 405;

//Function to create the game canvas and frog         
function gameArea() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 570, 45);
    ctx.fillRect(0, 380, 570, 45);

    ctx.fillStyle = "lime";
    ctx.fillRect(xPos, yPos, 20, 20);


    ctx.stroke();

}


//EventListener to move the frog in every direction by 5 pixels & redraws the canvas and frog
document.addEventListener("keydown", function (evt) {


    if (evt.which == 39 || evt.keycode == 39) {
        xPos += 5;
    }
    if (evt.which == 37 || evt.keycode == 37) {
        xPos -= 5;
    }
    if (evt.which == 38 || evt.keycode == 38) {
        yPos -= 5;
    }
    if (evt.which == 40 || evt.keycode == 40) {
        yPos += 5;
    }
    canvas.width = canvas.width;

    gameArea();

}, false);


var carStartLeft = 0;
var carStartRight = 400;


//Call the gameCollsion() function every .07 ms
var intervalId = setInterval(gameCollision, 7);


//Function to clear canvas to get rid of car path,draw canvas, and draw cars,
function gameCollision(key) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    gameArea();
    ctx.fillStyle = "red";
    ctx.fillRect(carStartLeft, 50, 20, 20);  // 7. car farthest from the frog
    ctx.fillRect(carStartLeft, 150, 20, 20); // 5
    ctx.fillRect(carStartLeft, 250, 20, 20); // 3
    ctx.fillRect(carStartLeft, 350, 20, 20); //car closest to the frog

    ctx.fillStyle = "purple";
    ctx.fillRect(carStartRight, 100, 20, 20); // 6
    ctx.fillRect(carStartRight, 200, 20, 20); // 4
    ctx.fillRect(carStartRight, 300, 20, 20); // 2


    //if statement to loop cars
    if (carStartRight > -100) {
        carStartRight = carStartRight - 2;
    } else {
        carStartRight = canvas.width + 100;
    }
    if (carStartLeft < canvas.width + 100) {
        carStartLeft = carStartLeft + 2;
    } else {
        carStartLeft = -100;
    }


    //Switch statement to check for collisions at each y value associated with a car path
    switch (true) {
        case yPos == 350 && (xPos == carStartLeft || xPos == carStartLeft - 1):
            gameOver();
            break;
        case yPos == 300 && (xPos == carStartLeft || xPos == carStartLeft - 1):
            gameOver();
        case yPos == 250 && (xPos == carStartLeft || xPos == carStartLeft - 1):
            gameOver();
            break;
        case yPos == 200 && (xPos == carStartLeft || xPos == carStartLeft - 1):
            gameOver();
            break;
        case yPos == 150 && (xPos == carStartLeft || xPos == carStartLeft - 1):
            gameOver();
            break;
        case yPos == 100 && (xPos == carStartLeft || xPos == carStartLeft - 1):
            gameOver();
            break;
        case yPos == 50 && (xPos == carStartLeft || xPos == carStartLeft - 1):
            gameOver();
            break;
    }

    //If statement to check if frog made it to other side and if so displays winner's list and opportunity to add user's name
    if (yPos < 30) {
        clearInterval(intervalId);
        canvas.style.display = "none";
        $("#game_title").hide();
        $("#list").show();
        $("#app").show();
    }

}
//Function to run if frog is hit by car
function gameOver() {
    canvas.style.display = "none";
    $("#game_title").hide();
    $("#game_over").show();
}


//Function that recieves input from Winner's textbox,stores it in local storage, retrieves it,displays it, and list is hidden on page until person wins

$("#list").hide();
$("#app").hide();


const app = new Vue({
    el: '#app',
    data: {
        winners: [],
        newWinner: null
    },
    mounted() {

        if (localStorage.getItem('winners')) {
            try {
                this.winners = JSON.parse(localStorage.getItem('winners'));
            } catch (e) {
                localStorage.removeItem('winners');
            }
        }
    },
    methods: {
        addWinner() {
            if (!this.newWinner)
                return;
            this.winners.push(this.newWinner);
            this.newWinner = '';
            this.saveWinners();
        },
        saveWinners() {
            let parsed = JSON.stringify(this.winners);
            localStorage.setItem('winners', parsed);
        }
    }
});

$(".play-again").click(function () {
    window.location.reload();
});
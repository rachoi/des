(function() {
    "use strict";
    console.log("reading js");

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');

    const actionArea = document.getElementById('actions');

    const dice = new Audio('sounds/clock-tick1.mp3');
    const win = new Audio('sounds/win.mp3');
    // const hp1 = document.getElementById('hp1');
    // const hp2 = document.getElementById('hp2');


    const gameData = {
        dice: ['imgs/1die.jpg', 'imgs/2die.jpg', 'imgs/3die.jpg', 'imgs/4die.jpg', 'imgs/5die.jpg', 'imgs/6die.jpg'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    }

    startGame.addEventListener("click", function() {
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);
        gameControl.innerHTML = '<h2> The Game has started </h2>';
        gameControl.innerHTML = '<button id="quit"> Want to quit? </button>';

        document.getElementById('quit').addEventListener("click", function() {
            location.reload();
        });
        console.log("set up the turn");

        function setUpTurn() {
            game.innerHTML = `<p class="prompt"> Roll the dice for ${gameData.players[gameData.index]} </p>`;
            actionArea.innerHTML = '<button id="roll"> Roll the dice</button>';
            document.getElementById('roll').addEventListener("click", function() {
                console.log("Roll the dice");
                throwDice();
            })
            document.getElementById("hp1").classList.remove("hidden");
            document.getElementById("hp2").classList.remove("hidden");

        }

        setUpTurn();

        function updateScore() {
            if(gameData.index === 0) {
                p1.style.height = `${20 * gameData.score[gameData.index]}px`;
                console.log(p1);
                console.log("updated score for p1");
            }
            else{
                p2.style.height = `${20 * gameData.score[gameData.index]}px`;
                console.log(p2);
                console.log("updated score for p1");

            }
            
        }

        function throwDice() {
            dice.play();
            actionArea.innerHTML = '';
            gameData.roll1 = Math.floor(Math.random() * 6) + 1;
            gameData.roll2 = Math.floor(Math.random() * 6) + 1;
            game.innerHTML = `<p class="prompt"> Roll the dice for the ${gameData.players[gameData.index]}</p>`;
            game.innerHTML += `<div class="img-cont">
                <img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}"></img>
            </div>`;
            gameData.rollSum = gameData.roll1 + gameData.roll2;

            if (gameData.rollSum === 2) {
                console.log("snake eyes were rolled");
                game.innerHTML += '<p class="prompt"> Oh snap! Snake eyes! </p>';
                gameData.score[gameData.index] = 0;
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                updateScore();
                setTimeout(setUpTurn, 2000);
            } else if (gameData.roll === 1 || gameData.roll2 === 1) {
                console.log("one of the two dice was a 1");
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                game.innerHTML += `<p class="prompt"> Sorry, one of your rolls was a one switching to ${gameData.players[gameData.index]}</p>`;
                setTimeout(setUpTurn, 2000);
                updateScore();
            } else {
                console.log("The game proceeds");
                gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
                actionArea.innerHTML = '<button id="rollagain"> Roll again </button> or <button id="pass"> Pass </button>';

                document.getElementById('rollagain').addEventListener('click', function() {
                    throwDice();
                })

                document.getElementById('pass').addEventListener('click', function() {
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                    setUpTurn();
                });

                updateScore();

                function checkWinningCondition() {

                    showCurrentScore();

                    if (gameData.score[gameData.index] > gameData.gameEnd) {
                        win.play();
                        score.innerHTML = `
                        <h2>${gameData.players[gameData.index]} wins with 
                        ${gameData.score[gameData.index]} points! </h2>`;
                        actionArea.innerHTML = '';
                        document.getElementById('quit').innerHTML = "Start a new game?";
                    }

                }

                checkWinningCondition();

                function showCurrentScore() {
                    score1.innerHTML = `<p> Player 1 score: <strong>${gameData.score[0]}</strong> 
                    </p>`;
                    score2.innerHTML = `<p> Player 2 score: <strong>${gameData.score[1]}</strong></p>`;
                }

            }
        }

        throwDice();
    })



})();
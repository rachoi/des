(function() {
    "use strict";
    console.log("reading js");

    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');

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
        gameControl.innerHTML = '<button id="quit"> Wanna Quit? </button>';

        document.getElementById('quit').addEventListener("click", function() {
            location.reload();
        });
        console.log("set up the turn");

        function setUpTurn() {
            game.innerHTML = `<p> Roll the dice for the ${gameData.players[gameData.index]} </p>`;
            actionArea.innerHTML = '<button id="roll"> Roll the dice</button>';
            document.getElementById('roll').addEventListener("click", function() {
                console.log("Roll the dice");
                throwDice();
            })
        }

        setUpTurn();

        function throwDice() {
            actionArea.innerHTML = '';
            gameData.roll1 = Math.floor(Math.random() * 6) + 1;
            gameData.roll2 = Math.floor(Math.random() * 6) + 1;
            game.innerHTML = `<p> Roll the dice for the ${gameData.players[gameData.index]}</p>`;
            game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}">`;
            gameData.rollSum = gameData.roll1 + gameData.roll2;

            if (gameData.rollSum === 2) {
                console.log("snake eyes were rolled");
                game.innerHTML += '<p> Oh snap! Snake eyes! </p>';
                gameData.score[gameData.index] = 0;
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setTimeout(setUpTurn, 2000);
            } else if (gameData.roll === 1 || gameData.roll2 === 1) {
                console.log("one of the two dice was a 1");
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                game.innerHTML += `<p> Sorry, one of your rolls was a one switching to ${gameData.players[gameData.index]}</p>`;
                setTimeout(setUpTurn, 2000);
            } else {
                console.log("The game proceeds");
                gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
                actionArea.innerHTML = '<button id="rollagain"> Roll again </button> or <button id="pass"> Pass </button>';

                document.getElementById('rollagain').addEventListener('click', function() {
                    throwDice();
                })

                document.getElementById('pass').addEventListener('clickl', function() {
                    gameData.index ? (gameData.index == 0) : (gameData.index = 1);
                    setUpTurn();
                });

                function checkWinningCondition() {
                    if (gameData.score[gameData.index] > gameData.gameEnd) {
                        score.innerHTML = `
                        <h2>${gameData.players[gameData.index]} wins with 
                        ${gameData.score[gameData.index]} points! </h2>`;
                        actionArea.innerHTML = '';
                        document.getElementById('quit').innerHTML = "Start a new game?";
                    } else {
                        showCurrentScore();
                    }

                }

                checkWinningCondition();

                function showCurrentScore() {
                    score.innerHTML = `<p> The score is currently: <string> ${gameData.players[0]}
                        with score: ${gameData.score[0]}</strong> and <strong> ${gameData.players[1]}
                        with score: ${gameData.score[1]}</strong></p>`;
                }

            }
        }

        throwDice();
    })



})();
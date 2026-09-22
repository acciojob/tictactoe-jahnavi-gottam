//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submit = document.getElementById("submit");
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1;
let player2;
let currentPlayer;
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

submit.addEventListener("click", function () {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names");
        return;
    }

    currentPlayer = player1;

    setup.style.display = "none";
    game.style.display = "block";

    message.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        const id = Number(cell.id);

        if (gameOver || board[id] !== "") {
            return;
        }

        if (currentPlayer === player1) {
            board[id] = "X";
            cell.textContent = "X";
        } else {
            board[id] = "O";
            cell.textContent = "O";
        }

        if (checkWinner()) {
            message.textContent = `${currentPlayer}, congratulations you won!`;
            gameOver = true;
            return;
        }

        if (board.slice(1).every(value => value !== "")) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;

        message.textContent = `${currentPlayer}, you're up`;
    });
});

function checkWinner() {
    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    return winningCombinations.some(function (combination) {
        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        return (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        );
    });
}
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessagetexteElement = document.querySelector(
    "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleturn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    isCircleturn = false

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("X");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
};

const endGame = (IsDraw) => {
    if (IsDraw) {
        winningMessagetexteElement.innerText = "Old!"
    } else {
        winningMessagetexteElement.innerText = isCircleturn
            ? "◯ Venceu!!"
            : "X Venceu!!";
    }

    winningMessage.classList.add("show-winning-message");
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains("X") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("X");

    if (isCircleturn) {
        board.classList.add("circle")
    } else {
        board.classList.add("X")
    }
}

const swapTurns = () => {
    isCircleturn = !isCircleturn

    setBoardHoverClass();
};

const handleClick = (e) => {
    //Colocar a marca (x ou Circulo)
    const cell = e.target;
    const classToAdd = isCircleturn ? "circle" : "X";

    placeMark(cell, classToAdd);

    //Verificar por virtoria
    const isWin = checkForWin(classToAdd);

    //Verificar por empate
    const IsDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (IsDraw) {
        endGame(true);
    } else {
        //Mudar simbolo
        swapTurns();
    }
};

startGame();

restartButton.addEventListener("click", startGame);
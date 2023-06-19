// rock paper sicssors
const rpcArray = ["rock", "paper", "scissors"];
let buttons = document.querySelectorAll(".button");
let message = document.querySelector(".message");
let comp = document.querySelector(".comp");
let computerSelection;

function computerChoice(){
    return rpcArray[~~(Math.random() * rpcArray.length)];
}

function playerSelection(){
    buttons.forEach((button => {
        button.addEventListener("click",() =>{
            let playerChoice = button.innerHTML.toLowerCase();
            playRound(playerChoice, computerSelection);

        });
    }));
}

function playRound(playerChoice, computerSelection){
    computerSelection = computerChoice().toLowerCase();
    //playerChoice = playerSelection();
    console.log("Computer choose:"+ " " + computerSelection + " Player choose:" + " " + playerChoice);

    if (computerSelection === playerChoice){
        message.innerHTML = "Tie!";
        comp.innerHTML = computerSelection;
    }
    else if (
        (computerSelection === "rock" && playerChoice === "scissors") ||
        (computerSelection === "scissors" && playerChoice === "paper") ||
        (computerSelection === "paper" && playerChoice === "rock")
      ) {
        message.innerHTML = "Datorn vann! " ;
        comp.innerHTML = computerSelection;

      }
      else{
        message.innerHTML = "Du vann!!";
        comp.innerHTML = computerSelection;

      }
}
playerSelection()
//end


// worlde start
const dictionary = ['APPLE', 'PLANE', 'CRANE', 'EARTH', 'CLONE','WORLD'];

const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6).fill().map(() => Array(5).fill('')),
    currentRow: 0,
    currrentColumn: 0,
}


function startup() {
    const game = document.getElementById('game');
    drawGrid(game);

    keyEvent();
    console.log(state.secret);
}

function keyEvent() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            if (state.currrentColumn === 5) {
                const word = getWord().toUpperCase();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currrentColumn = 0;
                }
                else {
                    alert('Not a valid word.');
                    console.log(word);
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);
        }
        updateGrid()
    }
}

function revealWord(guess){
    const row = state.currentRow;

    for (let i = 0; i<5 ; i++){
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent.toUpperCase();

        if (letter === state.secret[i]){
            box.classList.add('right');
        }
        else if (state.secret.includes(letter)){
            box.classList.add('wrong');
        }
        else{
            box.classList.add('empty');
        }
    }
    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;
    if(isWinner){
        message.innerHTML = "Du listade ut ordet!";
    }
    else if(isGameOver){
        message.innerHTML = `Ordet va: ${state.secret}`;
    }
}

function isLetter(key){
    return key.length === 1 && key.match(/[a-z]/i);
}
function addLetter(letter){
    if(state.currrentColumn === 5) return;
    state.grid[state.currentRow][state.currrentColumn] = letter;
    state.currrentColumn++;
}
function removeLetter(){
    if (state.currrentColumn === 0) return;
    state.grid[state.currentRow][state.currrentColumn -1] = '';
    state.currrentColumn--;

}
function getWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
    return dictionary.includes(word);
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j)
        }
    }
    container.appendChild(grid);
}

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}



startup();
//end



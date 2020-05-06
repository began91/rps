const options = ['rock','scissors','paper'];
const displayOptions = ['Rock','Scissors','Paper'];
let computerScore = 0;
let playerScore = 0;
let computerChoice=0;
let playerChoice=1;
let computer = document.getElementById('computer');
let player = document.getElementById('player');
let historyListElement = document.getElementById('history-list');
let winner;

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
}

let randomizeComputer = () => {
    computerChoice = Math.floor(Math.random()*3);
};

let decideWinner = (computerChoice, playerChoice) => {
    if ((playerChoice-computerChoice).mod(3) === 2) {
        winner = 'Player';
        //console.log(winner + ' wins');
        playerScore++;
        player.className = "winner";
        computer.className = "loser";
    }
    if ((playerChoice-computerChoice).mod(3) === 1) {
        winner = 'Computer';
        //console.log(winner + ' wins');
        computerScore++;
        player.className = "loser";
        computer.className = "winner";
    }
    if (playerChoice === computerChoice) {
        winner = 'Tie';
        //console.log(winner);
        player.className = 'tie';
        computer.className = 'tie';
    }
}

let displayResults = () => {
    computer.innerHTML = (
        `<div class="score">
                <h3>Computer</h3>
                <h3 id="comp-score">
                    ${computerScore}
                </h3>
            </div>
            <img id="comp-choice" src="hands/${options[computerChoice]}.bmp">
            <p>${displayOptions[computerChoice]}!</p>`
    );

    player.innerHTML = (
        `<div class="score">
            <h3>Player</h3>
            <h3 id="player-score">
                ${playerScore}
            </h3>
        </div>
        <img id="player-choice" src="hands/${options[playerChoice]}.bmp">
        <p>${displayOptions[playerChoice]}!</p>`
    )
}

let addToHistory = () => {
    historyListElement.innerHTML = (`
    <div class="historic-entry">
        <div class="historic ${player.className}">
            <img src="hands/${options[playerChoice]}.bmp">
        </div>
        <div class="historic ${computer.className}">
            <img src="hands/${options[computerChoice]}.bmp">
        </div>
        <div class="historic record">
            ${playerScore} - ${computerScore}
        </div>
    </div>`) + historyListElement.innerHTML;
}

let choices = [];

let play = event => {
    //console.log(event);
    playerChoice = options.indexOf(event.target.className);
    
    computerChoice = Math.floor(Math.random()*3);
    //console.log("computer: " + computerChoice + options[computerChoice]);
    //console.log("player: " + playerChoice + options[playerChoice]);
    decideWinner(computerChoice, playerChoice);

    displayResults();
    addToHistory();
};

for (let i = 0; i < 3; i++) {
    document.getElementsByClassName(options[i])[0].addEventListener('click', play);

    document.getElementsByClassName(options[i])[0].addEventListener('touch', play);
}

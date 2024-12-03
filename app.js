/*-------------------------------- Constants --------------------------------*/
const welcomeScreen = document.querySelector('.welcome-screen');
const startGameBtn = welcomeScreen.querySelector('.start-game-btn');
const nameEntryDialog = document.querySelector('.name-entry-dialog');
const submitNameButton = nameEntryDialog.querySelector('.submit-names-btn');//Next submit button
const selectCategoryDialog = document.querySelector('.select-category-dialog');
const categoryDialogTitle = selectCategoryDialog.querySelector('.category-dialog-title'); //To print the username with hi
const categoryButtons = selectCategoryDialog.querySelectorAll('.category-btn'); //category buttons
const selectLevelDialog = document.querySelector('.select-level-dialog');
const levelButtons = selectLevelDialog.querySelectorAll('.level-btn');
const levelMessage = selectLevelDialog.querySelector('.level-message'); //To print the username with grid
const gameRulesDialog = document.querySelector('.game-rule-dialog');
const gameBoard = document.querySelector('.game-board');
const wrongMatche=document.querySelector('.wrong-matches');
const correctMatche =document.querySelector('.correct-matches');
const timerElement = document.querySelector('.timer');

//Images
//used https://www.canva.com
const levelImages = {
    Animals : {
        easy : 'images/Grids/easy-orange.png',
        medium:'images/Grids/medium-orange.png',
        hard:'images/Grids/hard-orange.png',
    },
    Flags: {
        easy : 'images/Grids/easy-yellow.png',
        medium:'images/Grids/medium-yellow.png',
        hard:'images/Grids/hard-yellow.png',
    },
    'Periodic Table': {
        easy : 'images/Grids/easy-purple.png',
        medium:'images/Grids/medium-purple.png',
        hard:'images/Grids/hard-purple.png',
    },
    
};
//used https://www.flaticon.com/packs/wildlife-129
const animalImages =[
    'images/animals/beaver.png',
    'images/animals/camel.png',
    'images/animals/chimp.png',
    'images/animals/crocodile.png',
    'images/animals/deer.png',
    'images/animals/dolphin.png',
    'images/animals/elephant.png',
    'images/animals/falcon.png',
    'images/animals/fox.png',
    'images/animals/frog.png',
    'images/animals/giraffe.png',
    'images/animals/goat.png',
    'images/animals/goose.png',
    'images/animals/gorilla.png',
    'images/animals/hippo.png',
    'images/animals/horse.png',
    'images/animals/koala.png',
    'images/animals/lion.png',
    'images/animals/oryx.png',
    'images/animals/owl.png',
    'images/animals/panda.png',
    'images/animals/parrot.png',
    'images/animals/penguin.png',
    'images/animals/puma.png',
    'images/animals/raccoon.png',
    'images/animals/rhino.png',
    'images/animals/sheep.png',
    'images/animals/snake.png',
    'images/animals/squirrel.png',
    'images/animals/walrus.png',
    'images/animals/wolf.png',
    'images/animals/zebra.png',
];
const flagImages =[
    'images/Flags/1.png',
    'images/Flags/2.png',
    'images/Flags/3.png',
    'images/Flags/4.png',
    'images/Flags/5.png',
    'images/Flags/6.png',
    'images/Flags/7.png',
    'images/Flags/8.png',
    'images/Flags/9.png',
    'images/Flags/10.png',
    'images/Flags/11.png',
    'images/Flags/12.png',
    'images/Flags/13.png',
    'images/Flags/14.png',
    'images/Flags/15.png',
    'images/Flags/16.png',
    'images/Flags/17.png',
    'images/Flags/18.png',
    'images/Flags/19.png',
    'images/Flags/20.png',
    'images/Flags/21.png',
    'images/Flags/22.png',
    'images/Flags/23.png',
    'images/Flags/24.png',
    'images/Flags/25.png',
    'images/Flags/26.png',
    'images/Flags/27.png',
    'images/Flags/28.png',
    'images/Flags/29.png',
    'images/Flags/30.png',
    'images/Flags/31.png',
    'images/Flags/32.png',
];
const periodicTableImages = [
    'images/PeriodicTable/1.png',
    'images/PeriodicTable/2.png',
    'images/PeriodicTable/3.png',
    'images/PeriodicTable/4.png',
    'images/PeriodicTable/5.png',
    'images/PeriodicTable/6.png',
    'images/PeriodicTable/7.png',
    'images/PeriodicTable/8.png',
    'images/PeriodicTable/9.png',
    'images/PeriodicTable/10.png',
    'images/PeriodicTable/11.png',
    'images/PeriodicTable/12.png',
    'images/PeriodicTable/13.png',
    'images/PeriodicTable/14.png',
    'images/PeriodicTable/15.png',
    'images/PeriodicTable/16.png',
    'images/PeriodicTable/17.png',
    'images/PeriodicTable/18.png',
    'images/PeriodicTable/19.png',
    'images/PeriodicTable/20.png',
    'images/PeriodicTable/21.png',
    'images/PeriodicTable/22.png',
    'images/PeriodicTable/23.png',
    'images/PeriodicTable/24.png',
    'images/PeriodicTable/25.png',
    'images/PeriodicTable/26.png',
    'images/PeriodicTable/27.png',
    'images/PeriodicTable/28.png',
    'images/PeriodicTable/29.png',
    'images/PeriodicTable/30.png',
    'images/PeriodicTable/31.png',
    'images/PeriodicTable/32.png',
];
//Sounds
//used -> https://pixabay.com/sound-effects
const buttonSound = new Audio('sounds/mouse-click.mp3');
const gameOver = new Audio('sounds/game-over.mp3'); 
const startTimersound = new Audio('sounds/ticking-clock.mp3'); 
const claps = new Audio('sounds/claps.mp3'); 
const backgroundSound = new Audio('sounds/backgroundSound.mp3'); 


/*---------------------------- Variables (state) ----------------------------*/
let selectCategory='';
let selectedGrid ='';
let timer;
let timeLeft = 60; // 1-minute timer
let wrongMatches = 0;
let correctMatches = 0;
let totalPairs;
let isGameActive = false;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

/*------------------------ Cached Element References ------------------------*/
const allButtons = document.querySelectorAll('button');
/*-------------------------------- Functions --------------------------------*/
function playButtonSound() {
    buttonSound.play();
}
allButtons.forEach((button) => {
    button.addEventListener('click', playButtonSound);
});


function updateLevelImages (category){
    levelButtons.forEach((button , index)=>{
        const level = index === 0 ? 'easy':index===1 ? 'medium' : 'hard'
        const img = button.querySelector('img');
        img.src=levelImages[category][level];
        img.alt = `${category} ${level} image`;
    })
}
function startTimer() {
   
    startTimersound.play();
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            startTimersound.pause(true);
            endGame(false, 'timeout'); // Time ran out
        }
    }, 1000);
}
//For chosing random cards 
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generateCards(category, gridSize) {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = ''; // Clear existing cards

    //to know the total cards 
    const totalCards = gridSize * gridSize;
    const pairs = totalCards / 2;

    // to select images based on category
    const imagesArray = category === 'Animals' ? animalImages : 
                        category === 'Flags' ? flagImages : 
                        periodicTableImages;

    // select pairs of images randomly using shuffle array
    const selectedImages = shuffleArray(imagesArray).slice(0, pairs);
    const gameImages = shuffleArray([...selectedImages, ...selectedImages]); // Duplicate 

    // Generate cards and show to the game board
    gameImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index; // For identifying cards

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.style.backgroundImage = `url(${image})`;

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = index+1; //show on the card 1 to etc increment 

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        gameBoard.appendChild(card);

        card.addEventListener('click', () => handleCardFlip(card)); //for flip cards 
    });
}
//Handle fliping cards
function handleCardFlip(card) {
    if (!isGameActive || lockBoard || card.classList.contains('matched') || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card; // Set the first card
    } else {
        secondCard = card; // Set the second card
        lockBoard = true; // Lock the board until match check is complete
        checkForMatch();
    }
}
//Test matching cards and wrong cards to end the game 
function getMismatchLimit(gridSize) { //set the get mismatch limit 
    if (gridSize === '4x4') {
        return 6;
    } else if (gridSize === '6x6') {
        return 8;
    } else if (gridSize === '8x8') {
        return 10;
    }
}
function checkForMatch() {
    const mismatchLimit = getMismatchLimit(selectedGrid);
    const isMatch =
        firstCard.querySelector('.card-front').style.backgroundImage ===
        secondCard.querySelector('.card-front').style.backgroundImage;

    if (isMatch) {
        correctMatches++;
        correctMatche.textContent = `Correct Matches: ${correctMatches}`;
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();

        if (correctMatches === totalPairs) {
            endGame(true); //win
        }
    } else {
        wrongMatches++;
        wrongMatche.textContent = `Wrong Matches: ${wrongMatches}`;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();

            if (wrongMatches >= mismatchLimit) { //get the limit of mismatch 
                endGame(false ,'mismatch'); // mismatch game over
            }
        }, 1000);
    }
}

//Reset the board 
function resetBoard() {
    [firstCard, secondCard] = [null, null]; // clear selected cards
    lockBoard = false; 
}

//Show message based on reason of loss or win
function endGame(isWin, reason = '') {
    clearInterval(timer); // Stop the timer
    isGameActive = false;

    // Prepare the game data for the current session
    const gameData = {
        win: isWin,
        reason: reason,
        timeLeft: timeLeft,
        wrongMatches: wrongMatches,
        correctMatches: correctMatches,
        timestamp: new Date().toISOString() // Store timestamp for each game
    };
    
    // Retrieve the previous game data (if any)
    let previousGame = JSON.parse(localStorage.getItem('previousGame')) || null;

    // Save the current game data as the latest game
    localStorage.setItem('previousGame', JSON.stringify(gameData));

    // Show End Game Modal
    const modal = document.createElement('div');
    modal.className = 'end-game-modal';

    // Display win or loss message
    if (isWin) {
        startTimersound.pause();
        claps.play();
        modal.innerHTML = `<h2>Congratulations! You Win! 🎉</h2>`;
    } else {
        startTimersound.pause();
        gameOver.play();
        let message;
        if (reason === 'timeout') {
            message = 'Sorry, You Lost. Time is up! ⏳';
        } else if (reason === 'mismatch') {
            message = 'Sorry, You Lost. Too many wrong matches! 😢';
        } else {
            message = 'Game Over! 😢';
        }
        modal.innerHTML = `<h2>${message}</h2>`;
    }

    // If there is a previous game data, compare and show results
    if (previousGame) {
        let previousResultsHTML = "<p>Comparison with Previous Game:</p>";
        
         // Compare timeLeft
         if (previousGame.timeLeft < gameData.timeLeft) {
            previousResultsHTML += `<p><strong>You scored timeliest more than previous time! Great job! ⏱️</strong></p>`;
        }
        else if (isWin && previousGame.timeLeft > gameData.timeLeft) {
            previousResultsHTML += `<p><strong>You scored timeliest more than previous time and you win! Great job! </strong></p>`;
        }

        // Compare correct matches
        else if (previousGame.correctMatches < gameData.correctMatches) {
            previousResultsHTML += `<p><strong>You matched more cards than previous! Great work! </strong></p>`;
        }

        // Compare wrong matches
        else if (previousGame.wrongMatches > gameData.wrongMatches) {
            previousResultsHTML += `<p><strong>You matched fewer wrong cards than previous! Focus! </strong></p>`;
        }

        // Check for other possible conditions (e.g., game win/loss comparison)
        else if (previousGame.win !== gameData.win) {
            previousResultsHTML += `<p><strong>You either won or lost compared to the previous game! ${gameData.win ? 'Well done!' : 'Better luck next time!'}</strong></p>`;
        }
        
        // Additional condition for when no significant difference is found
        else {
            previousResultsHTML += `<p><strong>Your performance is similar to the previous game. Keep it up!</strong></p>`;
        }

        modal.innerHTML += previousResultsHTML;
    }

    // Add "Play Again" button
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
        resetSounds();
        location.reload(); // Reload the game
    });
    modal.appendChild(playAgainButton);

    document.body.appendChild(modal);
}


function resetSounds() {
    buttonSound.currentTime = 0;
    gameOver.currentTime = 0;
    startTimersound.currentTime = 0;
    claps.currentTime = 0;
    backgroundSound.currentTime = 0;
}

//Start the game 
function startGame() {
    const gridSize = selectedGrid === '4x4' ? 4 : selectedGrid === '6x6' ? 6 : 8;
    totalPairs = (gridSize * gridSize) / 2;
    generateCards(selectCategory, gridSize);

    timeLeft = gridSize === 4 ? 60 : gridSize === 6 ? 90 : 120;

    resetButton.style.display='block';
    correctMatche.style.display='block';
    wrongMatche.style.display='block';
    wrongMatche.textContent = `Wrong Matches: ${wrongMatches}`;
    correctMatche.textContent = `Correct Matches: ${correctMatches}`;
    timerElement.style.display = 'block'; // Show the timer when the game starts
    timerElement.textContent = `Time: ${timeLeft}s`;
    const gameBoard = document.querySelector('.game-board');
    gameBoard.className = `game-board grid-${gridSize}`;

    console.log(`Game started with ${selectCategory} category and ${gridSize}x${gridSize} grid.`);

    const cards = document.querySelectorAll('.card');
    const startSound = new Audio('sounds/countDown.mp3'); //get the sound
    startSound.play(); //play the sound

    // Reveal all cards for 5 seconds
    cards.forEach(card => card.classList.add('flipped'));

    setTimeout(() => {
        // Hide all cards after 3 seconds
        cards.forEach(card => card.classList.remove('flipped'));
        isGameActive = true; // Allow interaction after initial reveal
        startTimer(); // Start the game timer
         // play sound when start timer
    }, 5000); // 5000ms = 5 seconds
}

/*----------------------------- Event Listeners -----------------------------*/
// Event listener for submitting the player's name
submitNameButton.addEventListener('click', (event) => {
    playButtonSound();
    const playerNameInput = nameEntryDialog.querySelector('#player');
    const playerName = playerNameInput.value.trim();

        nameEntryDialog.style.display = 'none'; // Hide name entry dialog
        categoryDialogTitle.textContent = `Hi, ${playerName}🥰!`; // Greet player
        selectCategoryDialog.style.display = 'block'; // Show category dialog

});

//To get the user selection of the categry 
categoryButtons.forEach((button =>{
    button.addEventListener('click',(event =>{
        playButtonSound(); 
selectCategory = button.textContent.trim();
selectCategoryDialog.close();
selectCategoryDialog.style.display = 'none'; // Hide name entry dialog
const gameBoard = document.querySelector('.game-board');
        let categoryColor;
if (selectCategory === 'Animals') {
    selectLevelDialog.className = 'select-level-dialog animals';
    categoryColor = '#FEA554';
} else if (selectCategory === 'Flags') {
    selectLevelDialog.className = 'select-level-dialog flags';
    categoryColor = '#FED945'; 
} else if (selectCategory === 'Periodic Table') {
    selectLevelDialog.className = 'select-level-dialog periodic-table';
    categoryColor = '#A69CB4'; 
}
document.documentElement.style.setProperty('--category-color', categoryColor);

updateLevelImages(selectCategory);
const playerNameInput = nameEntryDialog.querySelector('#player');
const playerName = playerNameInput.value.trim();
levelMessage.textContent = `${playerName}, Please select your grid`;
selectLevelDialog.showModal();
 }))
}))


levelButtons.forEach((button)=>{
    
    button.addEventListener('click',(event=>{
        selectedGrid = button.textContent.trim();
        selectLevelDialog.close();
       
        const gameRuleTitle =gameRulesDialog.querySelector('.rule-title');
        const mismatchLimit = getMismatchLimit(selectedGrid);
        const mismatchRule = document.getElementById('mismatch-rule');
        const timerRuleText = document.getElementById('timer-rule');

       
         let timeMessage = '';
         if (selectedGrid === '4x4') {
             timeMessage = 'The timer is set for 1 minute; if time runs out, you lose.';
         } else if (selectedGrid === '6x6') {
             timeMessage = 'The timer is set for 2 minutes; if time runs out, you lose.';
         } else if (selectedGrid === '8x8') {
             timeMessage = 'The timer is set for 3 minutes; if time runs out, you lose.';
         }
         mismatchRule.textContent = `Making more than ${mismatchLimit} mismatches will result in a loss.`;
         gameRuleTitle.textContent = `How to play matching ${selectCategory}(${selectedGrid})`;
         timerRuleText.textContent = timeMessage;
        gameRulesDialog.showModal();
    }))
})
const startGameButton = gameRulesDialog.querySelector('.startgame-btn');
startGameButton.addEventListener('click', () => {
    gameRulesDialog.close(); // to close the rules dialog
    backgroundSound.pause();
    startGame(); // I will call startgame function to start the game 
});

// Event listener for starting the game from the welcome screen
startGameBtn.addEventListener('click', () => {
    resetSounds();
    playButtonSound(); // Play button sound
    backgroundSound.play();
    welcomeScreen.style.display = 'none'; // Hide welcome screen
    nameEntryDialog.style.display = 'block'; // Show name entry dialog
});

const selectLevelBackButton = selectLevelDialog.querySelector('.back-btn');

selectLevelBackButton.addEventListener('click', () => {
    selectLevelDialog.close(); 
    selectCategoryDialog.style.display = 'block';
    selectCategoryDialog.showModal(); 
});

const resetButton = document.querySelector('.reset-button');

resetButton.addEventListener('click', () => {
    resetSounds(); 
    playButtonSound(); 
    location.reload(); 
});

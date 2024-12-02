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
const selectLevelBackButton = selectLevelDialog.querySelector('.back-btn');
const levelMessage = selectLevelDialog.querySelector('.level-message'); //To print the username with grid
const gameRulesDialog = document.querySelector('.game-rule-dialog');
const gameBoard = document.querySelector('.game-board');
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
    'images/animals/dolphine.png',
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
//used -> https://pixabay.com/sound-effectsC
const buttonSound = new Audio('sounds/mouse-click.mp3');
const gameOver = new Audio('sounds/game-over.mp3'); 
const startTimersound = new Audio('sounds/ticking-clock.mp3'); 
const claps = new Audio('sounds/claps.mp3'); 

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
    const timerElement = document.querySelector('.timer');
    timerElement.style.display = 'block'; // Show the timer when the game starts
    timerElement.textContent = `Time: ${timeLeft}s`;
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
function checkForMatch() {
    const isMatch =
        firstCard.querySelector('.card-front').style.backgroundImage ===
        secondCard.querySelector('.card-front').style.backgroundImage;

    if (isMatch) {
        correctMatches++;
        document.querySelector('.correct-matches').textContent = `Correct Matches: ${correctMatches}`;
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();

        if (correctMatches === totalPairs) {
            endGame(true); //win
        }
    } else {
        wrongMatches++;
        document.querySelector('.wrong-matches').textContent = `Wrong Matches: ${wrongMatches}`;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();

            if (wrongMatches >= 6) {
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
    clearInterval(timer); // to stop the timer
    isGameActive = false;

    const modal = document.createElement('div');
    modal.className = 'end-game-modal';

    if (isWin) {
        startTimersound.pause(true);
        claps.play();
        modal.innerHTML = `<h2>Congratulations! You Win! 🎉</h2>`;
    } else {
        let message;
        if (reason === 'timeout') {
            gameOver.play();
            message = 'Sorry You Loss, your time is out! ⏳';
        } else if (reason === 'mismatch') {
            startTimersound.pause(true);
            gameOver.play();
            message = 'Sorry You Loss ,You mismatched too many cards! 😢';
        } else {
            startTimersound.pause(true);
            gameOver.play();
            message = 'Game Over! 😢';
        }
        modal.innerHTML = `<h2>${message}</h2>`;
    }

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => location.reload()); // Reload the game

    modal.appendChild(playAgainButton);
    document.body.appendChild(modal);
}

//Start the game 
function startGame() {
    const gridSize = selectedGrid === '4x4' ? 4 : selectedGrid === '6x6' ? 6 : 8;
    totalPairs = (gridSize * gridSize) / 2;
    generateCards(selectCategory, gridSize);

    const gameBoard = document.querySelector('.game-board');
    gameBoard.className = `game-board grid-${gridSize}`;

    console.log(`Game started with ${selectCategory} category and ${gridSize}x${gridSize} grid.`);

    const cards = document.querySelectorAll('.card');
    const startSound = new Audio('sounds/countDown.mp3'); //get the sound
    startSound.play(); //play the sound

    // Reveal all cards for 3 seconds
    cards.forEach(card => card.classList.add('flipped'));

    setTimeout(() => {
        // Hide all cards after 3 seconds
        cards.forEach(card => card.classList.remove('flipped'));

        isGameActive = true; // Allow interaction after initial reveal
        startTimer(); // Start the game timer
         // play sound when start timer
    }, 3000); // 3000ms = 3 seconds
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

         gameRuleTitle.textContent = `Rules for ${selectCategory}(${selectedGrid})`;
        gameRulesDialog.showModal();
    }))
})
const startGameButton = gameRulesDialog.querySelector('.back-btn');
startGameButton.addEventListener('click', () => {
    gameRulesDialog.close(); // to close the rules dialog
    startGame(); // I will call startgame function to start the game 
});

// Event listener for starting the game from the welcome screen
startGameBtn.addEventListener('click', () => {
    playButtonSound(); // Play button sound
    welcomeScreen.style.display = 'none'; // Hide welcome screen
    nameEntryDialog.style.display = 'block'; // Show name entry dialog
});


selectLevelBackButton.addEventListener('click', () => {
    selectLevelDialog.close(); 
    selectCategoryDialog.showModal(); 
});



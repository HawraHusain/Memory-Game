# The Memory Game 
> The game is designed to help improve memory skills, making it easier to remember and retain information. It's a great way to practice and enhance mental sharpness. My primary reason for creating this game was to learn and grow through the development process.

![Land page](images/Land-page.png)

--------

## Getting Started

### play the Game 
[The Memory Game Link]()

### How to Play 
1. Start the Game:
    - Click "Start Game" on the welcome screen.
2. Enter Your Name:
    - Input your name and click next.
3. Choose a Category: 
    - Pick one of the three categories: Animals, Flags, or Periodic Table.
4. Select Difficulty:
    -  Choose a grid size (Easy: 4x4, Medium: 6x6, Hard: 8x8).
5. Understand the Rules: 
    - Review the display game rules before starting.
6. Match pairs: 
    - Flip two cards at a time. Match all pairs before the timer runs out.
    - Avoid mismatches to prevent game over.

## planning Materials 

[View Planning Document](https://trello.com/b/UcVTFYqD/memory-game)

----------

## Attributuions 
- [Sound Effects](https://pixabay.com/sound-effec)
- [Card images](https://www.flaticon.com/packs/wildlife-129)
- [Backgrounds](https://www.canva.com)
- [Font](https://fonts.google.com/specimen/Spicy+Rice)
---------
## Technologies Used
![HTML](https://img.shields.io/badge/-HTML-E34F26?1ogo=html5&logoColor=white&style=flat-square)
![CSS](https://img.shields.io/badge/-CSS-1572B6?logo=css3&logoColor-white&style=flat-square)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square)
-------
# The Card Generate 
GenerateCards is to create the grid based on difficulty level user select and category selection by choosing images randomly from images arrays  

```javascript 
function generateCards(category, gridSize) {
    const totalCards = gridSize * gridSize;
    const pairs = totalCards / 2;

    const imagesArray = category === 'Animals' ? animalImages :
                        category === 'Flags' ? flagImages : 
                        periodicTableImages;

    const selectedImages = shuffleArray(imagesArray).slice(0, pairs);
    const gameImages = shuffleArray([...selectedImages, ...selectedImages]); // Duplicate images

    gameImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;

        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.style.backgroundImage = `url(${image})`;

        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = index + 1;

        card.appendChild(cardFront);
        card.appendChild(cardBack);
        document.querySelector('.game-board').appendChild(card);
    });
}

```
# Category Selection Implementation
Player will select their desired category to move on
```javascript
const selectCategoryDialog = document.querySelector('.select-category-dialog');
const categoryButtons = selectCategoryDialog.querySelectorAll('.category-btn');

```
Category Images are stored in arrays
```javascript
const animalImages = [
    'images/Animals/lion.png', 'images/Animals/tiger.png', 
    'images/Animals/elephant.png', 'images/Animals/giraffe.png',
//etc 
];

const flagImages = [
    'images/Flags/1.png', 'images/Flags/3.png', 
    'images/Flags/2.png', 'images/Flags/4.png',
//etc
];

const periodicTableImages = [
    'images/PeriodicTable/1.png', 'images/PeriodicTable/3.png', 
    'images/PeriodicTable/2.png', 'images/PeriodicTable/4.png',
    //etc
];

```
when a category selected , the level selection is updated to show  

# Level Implementation
 player will select their desired level via buttons in the level selection dialog.

```javascript
const selectLevelDialog = document.querySelector('.select-level-dialog');
const levelButtons = selectLevelDialog.querySelectorAll('.level-btn');
```
Each button corresponds to a level:
- Easy: 4x4 grid (16 cards)
- Medium: 6x6 grid (36 cards)
- Hard: 8x8 grid (64 cards)

The level buttons dynamically update with images based on the selected category:
```javascript 
function updateLevelImages(category) {
    levelButtons.forEach((button, index) => {
        const level = index === 0 ? 'easy' : index === 1 ? 'medium' : 'hard';
        const img = button.querySelector('img');
        img.src = levelImages[category][level];
        img.alt = `${category} ${level} image`;
    });
}
```

levelImages used to map categories to images based on category selection:
```javascript
const levelImages = {
    Animals: {
        easy: 'images/Grids/easy-orange.png',
        medium: 'images/Grids/medium-orange.png',
        hard: 'images/Grids/hard-orange.png',
    },
    Flags: {
        easy: 'images/Grids/easy-yellow.png',
        medium: 'images/Grids/medium-yellow.png',
        hard: 'images/Grids/hard-yellow.png',
    },
    'Periodic Table': {
        easy: 'images/Grids/easy-purple.png',
        medium: 'images/Grids/medium-purple.png',
        hard: 'images/Grids/hard-purple.png',
    },
};
```
 When a level button is clicked, the selected grid size is stored, and the game rules dialog is displayed: 

```javascript 
levelButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        selectedGrid = button.textContent.trim(); // Store selected grid size
        selectLevelDialog.close();

        const gameRuleTitle = gameRulesDialog.querySelector('.rule-title');
        gameRuleTitle.textContent = `How to play matching ${selectCategory} (${selectedGrid})`;
        gameRulesDialog.showModal(); // Show rules dialog
    });
});
```
# Show Rules of th Game
user will view modal that contains the rules of the game and when clicks on start game here the game will start 

# Game story 
The game will start when user clicks on "Start Game" after 3 second the cards will flip
```javascript
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
```
Then the Timer will start to count down for 1 minute 

```javascript

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

```
There will show the correct matchs and the wrong matchs 

```javascript 
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
```
## How will loss the game 

1. If user matchs 6 wrong cards.
2. If the time out.

## How will win the game

1. If user matches the all the cards

## Future Improvements 
- Add multiplayer.
- Add more categories and levels.



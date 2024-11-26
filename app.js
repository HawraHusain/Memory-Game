/*-------------------------------- Constants --------------------------------*/
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
/*---------------------------- Variables (state) ----------------------------*/
let selectCategory='';
let selectedGrid ='';
/*------------------------ Cached Element References ------------------------*/
/*-------------------------------- Functions --------------------------------*/

function updateLevelImages (category){
    levelButtons.forEach((button , index)=>{
        const level = index === 0 ? 'easy':index===1 ? 'medium' : 'hard'
        const img = button.querySelector('img');
        img.src=levelImages[category][level];
        img.alt = `${category} ${level} image`;
    })
}
/*----------------------------- Event Listeners -----------------------------*/
nameEntryDialog.showModal();
submitNameButton.addEventListener('click', (event) => {
    // console.log('Button clicked!'); for test
    const playerNameInput = nameEntryDialog.querySelector('#player');
    const playerName = playerNameInput.value.trim();
        nameEntryDialog.close();
        // console.log(submitNameButton); for test 
        categoryDialogTitle.textContent = `Hi, ${playerName}🥰!`;
        selectCategoryDialog.showModal();

});
//To get the user selection of the categry 
categoryButtons.forEach((button =>{
    button.addEventListener('click',(event =>{
selectCategory = button.textContent.trim();
console.log(`${selectCategory}`); //For test
selectCategoryDialog.close();
if (selectCategory === 'Animals') {
    selectLevelDialog.className = 'select-level-dialog animals';
} else if (selectCategory === 'Flags') {
    selectLevelDialog.className = 'select-level-dialog flags';
} else if (selectCategory === 'Periodic Table') {
    selectLevelDialog.className = 'select-level-dialog periodic-table';
}
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
        console.log(selectedGrid) //for test
        selectLevelDialog.close();

        const gameRuleTitle =gameRulesDialog.querySelector('.rule-title');

         gameRuleTitle.textContent = `Rules for ${selectCategory}(${selectedGrid})`;
        gameRulesDialog.showModal();
    }))
})
const startGameButton = gameRulesDialog.querySelector('.back-btn');
startGameButton.addEventListener('click', () => {
    gameRulesDialog.close();
    console.log(`Starting game with ${selectCategory} category and ${selectedGrid} grid.`);
});
selectLevelBackButton.addEventListener('click', () => {
    selectLevelDialog.close(); 
    selectCategoryDialog.showModal(); 
});


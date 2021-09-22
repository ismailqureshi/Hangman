'use strict';

const myWords = `horse door song trip backbone bomb round treasure garbage park pirate ski
state whistle palace baseball coal queen dominoes photograph computer
hockey aircraft hot dog salt and pepper key iPad whisk frog lawnmower mattress pinwheel cake
circus battery mailman cowboy password bicycle skate electricity lightsaber thief teapot deep
spring nature shallow toast outside America roller blading gingerbread man bowtie half spare wax
light bulb platypus music`;

const myWordsList = myWords.split(' ').filter(word => !word.includes("\n"));

const secretWord = myWordsList[Math.trunc(Math.random() * myWordsList.length)];

const secretWordList = secretWord.split('');

const guessedLetters = [];

let guessesRemaining = 6;

const getWordProgress = function(){
    let constructedWord = '';
    for(let i = 0; i <secretWordList.length; i++){
        if(guessedLetters.includes(secretWordList[i])){
            constructedWord += secretWordList[i];
        } else{
            constructedWord += ' _ ';
        }
    }
    return constructedWord;
}


// document.querySelector(`.part1`).style.display = `inline`; 
// document.querySelector(`.part2`).style.display = `inline`; 
// document.querySelector(`.part3`).style.display = `inline`; 
// document.querySelector(`.part4`).style.display = `inline`; 
// document.querySelector(`.part5`).style.display = `inline`; 
// document.querySelector(`.part6`).style.display = `inline`; 


const updateHangman = function(){
    for(let i = 6; i > guessesRemaining; i--){
        document.querySelector(`.part${i}`).style.display = `inline`; 
    }
};


const incorrectLetterGuessed = function(){
    document.querySelector(`.guesses-remaining`).textContent = `${guessesRemaining} Guesses Remaining`;
    // Cycle through numbers starting from i = 1, if i is less than gueses remaining, keep goin
    // For each cycle, document.qs(`.part${i}`).style.display = `block`;
};

document.querySelector('.constructed-word').textContent = getWordProgress();

document.querySelector('.submit').addEventListener('click', function(){

    const guess = document.querySelector('.guess').value;
    if (guess === secretWord){
        document.querySelector('.constructed-word').textContent = 'Good Work!';
        document.querySelector(`body`).style.backgroundColor = `rgb(15, 133, 126)`;
    } else if(guessedLetters.includes(guess)) {
        document.querySelector(`.constructed-word`).textContent = `Already Guessed`;
    } else{
        guessedLetters.push(guess);
        if(getWordProgress() === secretWord){
            // Change Background and everything else
            document.querySelector(`.constructed-word`).textContent = `You Win!`;
            document.querySelector(`body`).style.backgroundColor = `rgb(15, 133, 126)`;
        } else if(secretWordList.includes(guess)){
            document.querySelector('.constructed-word').textContent = getWordProgress();
        } else{
            guessesRemaining --;
            if(guessesRemaining === 0){
                document.querySelector(`.constructed-word`).textContent = `The correct word was: ${secretWord}`;
                updateHangman();
            } else{
                incorrectLetterGuessed();
                updateHangman();
            };
        };
    };
});

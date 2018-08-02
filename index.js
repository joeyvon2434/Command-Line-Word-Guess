var fs = require('fs');
var Word = require('./word.js');
var inquirer = require('inquirer');

//create a random word array

var wordList = ['cat', 'dog', 'element', 'moment', 'rapids', 'college', 'firestorm', 'edible', 'crowded', 'xylaphone', 'repeat', 'game', 'desk', 'javascript', 'node', 'cooler', 'query', 'bottle', 'treasure', 'pirate', 'code', 'chosen', 'television', 'alphabet', 'season', 'capital', 'bird', 'whale', 'polar', 'winter', 'spring', 'summer', 'fall', 'movie', 'paper', 'computer', 'printer', 'city', 'xylaphone', 'trombone', 'tube', 'tuba', 'baritone', 'saxophone', 'trumpet', 'clarinet', 'oboe', 'car', 'weasel', 'golf', 'baseball', 'coffee', 'soccer', 'basketball', 'football', 'volleyball', 'glasses', 'beer'];
var selectedWord = '';

/////////////////////////////////////
//Game progression
/////////////////////////////////////

beginGame();



/////////////////////////////////////
//Called function list
/////////////////////////////////////

//begin game
function beginGame() {
    inquirer.prompt([{
        name: "play",
        type: "confirm",
        message: "\nWould you like to play a word guess game?"
    }]).then(function (answers) {
        if (answers.play) {
            var newWord = new Word();
            chooseWord();
            console.log('Awesome. Let me get a word ready!\n');
            inquirer.prompt([{
                name: 'ready',
                type: 'confirm',
                message: "Let's play! Enter 'yes' to begin.\n"
            }]).then(function () {
                newWord.generateWordArray(selectedWord);
                var guessesLeft = 6;
                console.log('\nGet ready to choose your first letter!\n')
                playGame(newWord, guessesLeft);
            });


            //end game play
        } else {
            console.log('\nOh well. Your loss. Come again when you would like to play...\n')
        }
    });
};

//Choose a random word
function chooseWord() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    return selectedWord;
}; // end word selection


//Function for game play
function playGame(newWord, incorrect) {
    newWord.showWord();
    var winGame = true;
        for (var i = 0; i < newWord.word.length; i++) {
            if (newWord.word[i].guessed == false) {
                winGame = false;
                break;
            }; //end if statement checking if n
        }

        //checks if the play has won or lost the game, then procedes to letter selection
    if (incorrect > 0 && winGame == false) {
        console.log('\nYou have ' + incorrect + ' incorrect guesses remaining.\n');
        inquirer.prompt([{
            name: 'letter',
            message: 'pick a letter\n'
        }]).then(function(answers) {
            var guess = answers.letter;
            newWord.checkLetter(guess);
            var correctGuess = false;
            for (var i = 0; i < newWord.word.length; i++) {
                if (guess == newWord.word[i].name) {
                    correctGuess = true;
                    break;
                }
            };

            //checks the players guess then calls the functions based on right or wrong choices
            if (correctGuess == true) {
                console.log('\nCorrect!\n');
                playGame(newWord, incorrect);
            } else {
                console.log('\nSorry, that letter is not in the word.')
                incorrect = incorrect - 1;
                playGame(newWord, incorrect);
            }
        })

        //displays the necessary responses for a win
    } else if (winGame == true) {
        console.log('\nCongratulations! You win.\n')
        beginGame();

        //displays the responses for a loss and shows the word
    } else {
        console.log('\nSorry, you are out of guesses. You lose.\n');

        newWord.loseGame();
        newWord.showWord();
        beginGame();
    }
}; //end play game function

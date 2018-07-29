var fs = require("fs");
var Letter = require("./letters.js");


var Word = function() {
    this.word = [];
    this.generateWordArray = function(randomWord) {
        for (var i = 0; i < randomWord.length; i++) {
           var letter = new Letter(randomWord[i]);
           this.word.push(letter);
        }; //end for loop to generate letter objects
    }; //end generateWordArray
    this.showWord = function () {
        var term = [];
        for (var i = 0; i < this.word.length; i++) {
            term.push(this.word[i].display);
        }; //end for loop in showWord
        console.log(term.join(' '));
    };//end show word function
    this.checkLetter = function (guess) {
        for (var i = 0; i < this.word.length; i++) {
            this.word[i].letterGuessed(guess);
        }; //end for loop to check guessed lettters
    }; //end check letter function
}; //end Word constructor

module.exports = Word;

// var newWord = new Word();
// newWord.generateWordArray('cat');
// console.log(newWord.word);
// console.log('-------------------')
// newWord.checkLetter('a');
// console.log(newWord.word);
// newWord.showWord();
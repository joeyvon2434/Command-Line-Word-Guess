//ensure fs is available for use

var fs = require('fs');


//Set up Letters constructor

var Letter = function (name) {
    this.name = name;
    this.display = '_';
    this.guessed = false;
    //displays letter when the letter is guessed
    this.displayLetter = function () {
        if (this.guessed == true) {
            this.display = this.name;
        };
    }; // end display letter
    //checks to see if guessed letter matches
    this.letterGuessed = function (letter) {
        if (this.name == letter) {
            this.guessed = true;
            this.displayLetter();
        };
    }; // end letterGuessed function

}; //end of constructor

module.exports = Letter;

// var letter = new Letter('a');
// console.log(letter);
// letter.letterGuessed('a');
// console.log(letter);


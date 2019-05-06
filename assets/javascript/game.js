// Declare Variables
var game;
var wordBank = {
    words: ["Mario"],

    // Gives a random word when  called
    random: function() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }
};

var letterBank = {
    letters: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    // Checks if query is a letter
    checkIsLetter: function(query) {
        return this.letters.indexOf(query) !== -1;
    } 
};

window.onload = function() {
    game = {
        // Variables
        word: wordBank.random(),
        wins: 0,
        losses: 0,
        remainingGuesses: 12,
        used: [],

        // Elements
        winsElement: document.querySelector("#wins"),
        lossesElement: document.querySelector("#losses"),
        wordElement: document.querySelector("#word"),
        remainingElement: document.querySelector("#remaining"),
        usedElement: document.querySelector("#used"),

        // Functions
        // Renders game values to the screen.
        render: function() {
            // TODO: Add rendering for the word element.

            this.winsElement.textContent = this.wins;
            this.lossesElement.textContent = this.losses;
            this.remainingElement.textContent= this.remainingGuesses;
            
            this.usedElement.textContent = this.used.length === 0 ? "" : this.usedElement.textContent + this.used[this.used.length - 1] + " ";
        },

        takeInput: function(input){
            // Ignore non-letter input or already used input
            if(!letterBank.checkIsLetter(input) || this.checkWasUsed(input))
                return;
            
            alert("Valid letter");

            // TODO: Add Game Logic
            
        },

        // Test if we already used the letter
        checkWasUsed: function(query) {
            return this.used.indexOf(query) !== -1;
        },

        // Resets the game
        reset: function () {
            this.word = wordBank.random();
            this.remainingGuesses = 12;
            this.used = [];
        }
    };

    document.onkeyup = function(event) {
        game.takeInput(event.key.toLowerCase());
    };


    game.render();
};
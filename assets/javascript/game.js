// Declare Variables
var game;
var wordBank = {
    words: ["PacMan"],

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
        correct: [],

        // Elements
        winsElement: document.querySelector("#wins"),
        lossesElement: document.querySelector("#losses"),
        wordElement: document.querySelector("#word"),
        remainingElement: document.querySelector("#remaining"),
        usedElement: document.querySelector("#used"),
        puzzleSpans: [],

        // Functions
        // Renders game values to the screen.
        render: function() {
            // TODO: Add rendering for the word element.
            this.correct.forEach(function(item) {
                game.puzzleSpans[item.index].textContent = item.letter;
            });


            this.winsElement.textContent = this.wins;
            this.lossesElement.textContent = this.losses;
            this.remainingElement.textContent= this.remainingGuesses;
            
            this.usedElement.textContent = this.used.length === 0 ? "" : this.usedElement.textContent + this.used[this.used.length - 1] + " ";
        },

        initializePuzzle: function () {
            for(var i = 0; i < this.word.length; i++){
                var newSpan = document.createElement("span");
                newSpan.textContent = "_";
                this.puzzleSpans.push(newSpan);
                this.wordElement.appendChild(newSpan);
            }
        },

        // Takes in input from the keyboard
        takeInput: function(input){
            // Ignore non-letter input or already used input
            if(!letterBank.checkIsLetter(input) || this.checkWasUsed(input))
                return;
            
            
            // Put input into used
            this.used.push(input);
            var i = this.word.toLowerCase().indexOf(input);

            // Not found in word, decrement guesses
            if(i === -1){
                this.remainingGuesses--;
                
                // No more guesses, player has lost, reset
                if(this.remainingGuesses === 0){
                    this.losses++;
                    this.reset();
                }
            }

            // Repeat until you don't find any more
            while(i !== -1){
                this.correct.push({letter: this.word[i], index: i});
                i = this.word.toLowerCase().indexOf(input, i + 1);
            }

            // Player has found the word, update wins and reset
            if(this.correct.length === this.word.length){
                this.wins++;
                this.reset();
            }
            
            this.render();
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
            this.correct =  [];
            this.puzzleSpans = [];
            while(this.wordElement.firstChild)
                this.wordElement.removeChild(this.wordElement.firstChild);

            this.initializePuzzle();
        }
    };

    document.onkeyup = function(event) {
        game.takeInput(event.key.toLowerCase());
    };

    game.initializePuzzle();
    game.render();
};
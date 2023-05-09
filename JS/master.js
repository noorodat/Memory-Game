/*
    No Code Here
*/


document.querySelector(".control-buttons span").onclick = function () {

    // Enter the player name and show it
    let yourName = prompt("Enter your name");

    if(yourName === null || yourName === "") {
        document.querySelector(".name span").textContent = "Guest";
    }
    
    else {
        document.querySelector(".name span").textContent = yourName;
    }
    
    // remove the splash screen
    document.querySelector(".control-buttons").remove();

    memorizeCards();
    
}

let duration = 500;

let gameContainer = document.querySelector(".game-container");

// Create array from game cards
let cards = Array.from(gameContainer.children);

// Create range of keys
let orderRange = Array.from(Array(cards.length).keys());

shuffleNumbers(orderRange);


// Add order CSS prop to game cards
cards.forEach((card, indx) => {

    card.style.order = orderRange[indx];

    // Add click event

    card.addEventListener("click", function () {

        // Call flip block function
        flipCard(card);

    })

});

// Flip block function

function flipCard(selectedBlock) {

    // Add flipped class
    selectedBlock.classList.add('flipped');

    // Collect all flipped cards
    let allFlippedCards = cards.filter(flippedCard => flippedCard.classList.contains('flipped'));
    
    // If two selected
    if(allFlippedCards.length === 2) {

        stopClicking();

        checkMatchedCards(allFlippedCards[0], allFlippedCards[1]);

        checkIfWin();

    }
    

    // Stop clicking function

    // Check if the cards are matched
}

// Stop clicking function


function stopClicking() {

    // Add no clicking class on main container
    gameContainer.classList.add('no-clicking');

    setTimeout(() => {

        // Remove the no clicking class
        gameContainer.classList.remove('no-clicking');

    }, duration)

}


// Check matched cards

function checkMatchedCards(firstCard, secondCard) {

    let triesElement = document.querySelector(".wrong-tries span");

    if (firstCard.dataset.tech === secondCard.dataset.tech) {

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

    }

    else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            
        }, duration)

    }

}


// Suffle function (To have an unordered numbers)

function shuffleNumbers(array) {

    // Settings Vars
    let current = array.length,
        temp,
        random;

        while (current > 0) {

            // Get Random Number
            random = Math.floor(Math.random() * current);
        
            // Decrease Length By One
            current--;
        
            // [1] Save Current Element in Stash
            temp = array[current];
        
            // [2] Current Element = Random Element
            array[current] = array[random];
        
            // [3] Random Element = Get Element From Stash
            array[random] = temp;

    }

    return array;

}


function memorizeCards() {

    let allCards = document.querySelectorAll(".game-block");

    allCards.forEach(card => {

    card.classList.add("flipped");

    });

    setTimeout(() => {

        allCards.forEach(card => {

            card.classList.remove("flipped");
        
            });

    }, 2000)

}

function checkIfWin() {

    let cnt = 0;

    let allMatched = document.querySelectorAll(".game-block");

    allMatched.forEach(matched => {
        if (matched.classList.contains("matched")) {
            cnt++;
        }
    });

    if (cnt === allMatched.length) {

        document.querySelector(".congrats").style.display = "block";
        document.querySelector(".win-sound").play();

        setTimeout(() => {

            document.querySelector(".congrats").style.display = "none";
            location.reload();

        }, 3000);

    }

}




const inputTextArea = document.getElementById('inputTextArea');
const outputDisplay = document.getElementById('outputDisplay');

const showAllBTN = document.getElementById('showAllBTN');
const giveTryBTN = document.getElementById('giveTryBTN');
const enterCandidateBTN = document.getElementById('enterCandidateBTN');

const listOfCandidate = document.getElementById('listOfCandidate');
const remainingMembers = document.getElementById('remainingMembers');
const firstWinner = document.getElementById('firstWinner');
const secondWinner = document.getElementById('secondWinner');
const thirdWinner = document.getElementById('thirdWinner');

// Store candidates
const candidates = [];

// Enter candidate
enterCandidateBTN.addEventListener('click', () => {
    if (inputTextArea.value.trim() === '') {
        alert('No entry yet');
        return;
    }

    // Split by commas or newlines                   remove extra spaces          remove empty entries
    let names = inputTextArea.value.split(/[\n,]+/).map(name => name.trim()).filter(name => name !== '');

    if (names.length < 5) {
        alert('Please enter at least 5 names');
        return;
    }

    // Add new names to candidates
    candidates.push(...names);
    createListOfCandidate(candidates);
    inputTextArea.value = '';
});

// Show all candidates
showAllBTN.addEventListener('click', () => {
    if (candidates.length === 0) {
        alert('No candidates yet');
        return;
    }
    createListOfCandidate(candidates);
})

let winnerCount = 0; // track which winner we are picking

// Find a winner and display with spin effect
giveTryBTN.addEventListener('click', () => {
    if (candidates.length === 0) {
        alert("No candidates left!");
        return;
    }

    if (winnerCount >= 3) {
        alert("Already picked 3 winners!");
        return;
    }

    // Shuffle candidates
    let suffledArr = suffledArrFun(candidates);

    // Spin effect
    let spins = 15;
    let count = 0;

    let spinInterval = setInterval(() => {
        let tempRand = Math.floor(Math.random() * suffledArr.length);
        outputDisplay.innerText = suffledArr[tempRand];
        count++;

        if (count >= spins) {
            clearInterval(spinInterval);

            let finalIndex = Math.floor(Math.random() * suffledArr.length);
            let winner = suffledArr[finalIndex];

            // Show final winner
            outputDisplay.innerText = winner;

            if (winnerCount === 0) {
                firstWinner.innerText = winner;
            } else if (winnerCount === 1) {
                secondWinner.innerText = winner;
            } else if (winnerCount === 2) {
                thirdWinner.innerText = winner;
            }

            // Remove winner from candidates
            let idx = candidates.indexOf(winner);
            if (idx !== -1) {
                candidates.splice(idx, 1);
            }

            // Update list
            createRemainListOfCandidate(candidates);

            console.log(`Winner ${winnerCount + 1}:`, winner);
            console.log("Remaining:", candidates);

            winnerCount++; // move to next winner
        }
    }, 150);
});

function createListOfCandidate(candidates) {
    listOfCandidate.innerHTML = '';
    candidates.forEach((candidate, index) => {
        let i = 0;
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${candidate}`;
        listOfCandidate.appendChild(li);
    });
}

function createRemainListOfCandidate(candidates) {
    remainingMembers.innerHTML = '';
    candidates.forEach((candidate, index) => {
        let i = 0;
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${candidate}`;
        remainingMembers.appendChild(li);
    });
}

// Fisher-Yates Shuffle Algorithm for shuffling array
function suffledArrFun(arr) {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
    }
    return array;
}


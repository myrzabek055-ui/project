
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^(?!\d+@)[a-zA-Z0-9.]+@gmail\.com$/;

gmailButton.addEventListener('click', () => {
    if (regExp.test(gmailInput.value) && gmailInput.value.split('@')[0].length >= 3) {
        gmailResult.innerHTML = 'Valid';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.innerHTML = 'Invalid';
        gmailResult.style.color = 'red';
    }
});


const childBlock = document.querySelector('.child_block');

let positionX = 0;
let positionY = 0;
let direction = 'right'; 

const moveChildBlock = () => {
    if (direction === 'right') {
        if (positionX < 448) {
            positionX += 2;
            childBlock.style.left = `${positionX}px`;
            setTimeout(moveChildBlock, 20);
        } else {
            direction = 'down';
            setTimeout(moveChildBlock, 20
            );
        }
    } else if (direction === 'down') {
        if (positionY < 448) {
            positionY += 2;
            childBlock.style.top = `${positionY}px`;
            setTimeout(moveChildBlock, 20);
        } else {
            direction = 'left';
            setTimeout(moveChildBlock, 20);
        }
    } else if (direction === 'left') {
        if (positionX > 0) {
            positionX -= 2;
            childBlock.style.left = `${positionX}px`;
            setTimeout(moveChildBlock, 20);
        } else {
            direction = 'up';
            setTimeout(moveChildBlock, 20);
        }
    } else if (direction === 'up') {
        if (positionY > 0) {
            positionY -= 2;
            childBlock.style.top = `${positionY}px`;
            setTimeout(moveChildBlock, 20);
        } else {
            direction = 'right';
            setTimeout(moveChildBlock, 20);
        }
    }
};

moveChildBlock();


const secondsDisplay = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

let timerId = null;
let seconds = 0;

startButton.addEventListener('click', () => {
    if (!timerId) { 
        timerId = setInterval(() => {
            seconds++;
            secondsDisplay.innerHTML = seconds;
        }, 1000);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null; 
});

resetButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    seconds = 0;
    secondsDisplay.innerHTML = seconds;
});

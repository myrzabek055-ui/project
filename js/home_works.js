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

const moveChildBlock = () => {
    if (positionX < 448) { 
        positionX++;
        childBlock.style.left = `${positionX}px`;
        setTimeout(moveChildBlock, 20); 
    }
};

moveChildBlock();
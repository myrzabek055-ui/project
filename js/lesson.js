// ==================== PHONE CHECKER ====================
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 \d{3} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = "OK";
        phoneResult.style.color = "green";
    } else {
        phoneResult.innerHTML = "ERROR";
        phoneResult.style.color = "red";
    }
};

// ==================== TAB SLIDER ====================
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach(item => {
        item.style.display = 'none';
    });
    tabs.forEach(item => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (i = 0) => {
    tabContentBlocks[i].style.display = 'block';
    tabs[i].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, i) => {
            if (event.target === item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
};

// ==================== CONVERTER (EUR кошулган) ====================
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const convert = (elem, target, target2) => {
    elem.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);
            if (elem.id === 'som') {
                target.value = (elem.value / data.usd).toFixed(2);
                target2.value = (elem.value / data.eur).toFixed(2);
            } else if (elem.id === 'usd') {
                target.value = (elem.value * data.usd).toFixed(2);
                target2.value = (elem.value * data.usd / data.eur).toFixed(2);
            } else if (elem.id === 'eur') {
                target.value = (elem.value * data.eur).toFixed(2);
                target2.value = (elem.value * data.eur / data.usd).toFixed(2);
            }
            elem.value === '' && (target.value = '', target2.value = '');
        };
    };
};

convert(somInput, usdInput, eurInput);
convert(usdInput, somInput, eurInput);
convert(eurInput, somInput, usdInput);

// ==================== CARD SWITCHER ====================

const card = document.querySelector('.card');
const prevButton = document.querySelector('#btn-prev');
const nextButton = document.querySelector('#btn-next');

let cardId = 1;
const maxCardId = 200;

const getCard = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

        card.innerHTML = `
            <p>ID: ${data.id}</p>
            <h4>${data.title}</h4>
        `;
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

nextButton.onclick = () => {
    cardId++;

    if (cardId > maxCardId) {
        cardId = 1;
    }

    getCard(cardId);
};

prevButton.onclick = () => {
    cardId--;

    if (cardId < 1) {
        cardId = maxCardId;
    }

    getCard(cardId);
};

// Карточка башында бош болбошу үчүн
getCard(cardId);

// ==================== FETCH POSTS ====================

const getPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
};

getPosts();
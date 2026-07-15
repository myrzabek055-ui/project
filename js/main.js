// ==================== 1-ТАПШЫРМА (Gmail Валидатор) ====================
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

if (gmailButton && gmailInput && gmailResult) {
    gmailButton.onclick = () => {
        const value = gmailInput.value;
        
        // 1. Форматты текшерүү (3+ белги жана @gmail.com)
        const formatRegExp = /^[a-zA-Z0-9]{3,}@gmail\.com$/;
        
        // 2. Жалаң сандардан турбасын текшерүү (эгер жалаң сандар болсо, бул true болот)
        const isOnlyNumbers = /^[0-9]+@gmail\.com$/.test(value);

        if (formatRegExp.test(value) && !isOnlyNumbers) {
            gmailResult.innerHTML = "VALID";
            gmailResult.style.color = "green";
        } else {
            gmailResult.innerHTML = "INVALID";
            gmailResult.style.color = "red";
        }
    };
}

// ==================== 1 & 2-ТАПШЫРМА (Красный квадрат 2.0) ====================
const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');

let positionX = 0;
let positionY = 0;

const moveBlock = () => {
    if (!childBlock || !parentBlock) return;

    // Чек араларды аныктоо (родитель менен баланын өлчөмдөрүнүн айырмасы)
    const maxOffsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
    const maxOffsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

    // Квадраттын төрт бурчтук боюнча айлануу логикасы
    if (positionX < maxOffsetWidth && positionY === 0) {
        positionX += 1.5; // Оңго жылуу
        childBlock.style.left = `${positionX}px`;
    } else if (positionX >= maxOffsetWidth && positionY < maxOffsetHeight) {
        positionY += 1.5; // Төмөн жылуу
        childBlock.style.top = `${positionY}px`;
    } else if (positionX > 0 && positionY >= maxOffsetHeight) {
        positionX -= 1.5; // Солго жылуу
        childBlock.style.left = `${positionX}px`;
    } else if (positionX === 0 && positionY > 0) {
        positionY -= 1.5; // Өйдө жылуу
        childBlock.style.top = `${positionY}px`;
    }

    requestAnimationFrame(moveBlock); // Рекурсия аркылуу анимацияны иштетүү
};

if (childBlock && parentBlock) {
    moveBlock();
}

// ==================== 2-ТАПШЫРМА (Секундомер) ====================
const secondsBlock = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

let timerId = null;
let count = 0;

if (secondsBlock && startButton && stopButton && resetButton) {
    startButton.onclick = () => {
        if (!timerId) { // Таймер буга чейин иштеп жаткан болсо, экинчи жолу басылгандагы багды алдын алуу
            timerId = setInterval(() => {
                count++;
                secondsBlock.innerHTML = count;
            }, 1000);
        }
    };

    stopButton.onclick = () => {
        clearInterval(timerId);
        timerId = null; // Кайра баштаганда улантуу үчүн ID'ни тазалайбыз
    };

    resetButton.onclick = () => {
        clearInterval(timerId);
        timerId = null;
        count = 0;
        secondsBlock.innerHTML = count;
    };
}

// ==================== 3-ТАПШЫРМА (Слайдер жана Модал) ====================
// Слайдер (башка баракчада болсо гана иштейт, ката бербейт)
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
let index = 0;
let autoSliderId = null;

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0;
        slide.classList.remove('active_slide');
    });
};

const showSlide = (i = 0) => {
    if (slides.length > 0) {
        slides[i].style.opacity = 1;
        slides[i].classList.add('active_slide');
    }
};

const startAutoSlider = () => {
    if (slides.length > 0) {
        autoSliderId = setInterval(() => {
            index = (index + 1) % slides.length;
            hideSlide();
            showSlide(index);
        }, 3000);
    }
};

const resetAutoSlider = () => {
    clearInterval(autoSliderId);
    startAutoSlider();
};

if (next) {
    next.onclick = () => {
        index = index < slides.length - 1 ? index + 1 : 0;
        hideSlide();
        showSlide(index);
        resetAutoSlider();
    };
}

if (prev) {
    prev.onclick = () => {
        index = index > 0 ? index - 1 : slides.length - 1;
        hideSlide();
        showSlide(index);
        resetAutoSlider();
    };
}

// Модалдык терезе
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal_close');

const openModal = () => {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Модал бир жолу ачылгандан кийин угуучуларды жана таймерди өчүрөбүз
        window.removeEventListener('scroll', checkScrollEnd);
        clearTimeout(modalTimer);
    }
};

const closeModal = () => {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

if (modalCloseButton) modalCloseButton.onclick = () => closeModal();

if (modal) {
    modal.onclick = (event) => {
        if (event.target === modal) closeModal();
    };
}

const checkScrollEnd = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        openModal();
    }
};

let modalTimer;
if (modal) {
    window.addEventListener('scroll', checkScrollEnd);
    modalTimer = setTimeout(openModal, 10000); // 10 секунддан кийин ачуу
}

// ==================== 4-ТАПШЫРМА (JSON Персонаждар жана Any.json - XMLHttp) ====================
// МУГАЛИМДИН ТАЛАБЫ: Бул жерде КАТУУ талап боюнча XHR (XMLHttpRequest) гана колдонулду!

const loadCharacters = () => {
    const container = document.querySelector('.characters-list');
    if (!container) return;

    const request = new XMLHttpRequest();
    request.open("GET", "../data/characters.json");
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            const data = JSON.parse(request.response);
            container.innerHTML = '';
            
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'character-card';
                
                // Бул жерде Ролу -> Role, Жашы -> Age деп өзгөртүлдү
                card.innerHTML = `
                    <div class="character-photo">
                        <img src="${item.photo}" alt="${item.name}">
                    </div>
                    <h3>${item.name}</h3>
                    <p>Role: ${item.person}</p>
                    <p>Age: ${item.age}</p>
                `;
                container.append(card);
            });
        }
    };
};

const loadAnyData = () => {
    const request = new XMLHttpRequest();
    request.open("GET", "../data/any.json");
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            try {
                const data = JSON.parse(request.response);
                console.log("ANY.JSON маалыматы объект түрүндө:", data);
            } catch (error) {
                console.error("any.json файлында ката бар:", error);
            }
        } else {
            console.error("any.json файлы табылган жок. Статус:", request.status);
        }
    };
};

// ==================== ЖАЛПЫ ИНИЦИАЛИЗАЦИЯ ====================
window.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        hideSlide();
        showSlide(index);
        startAutoSlider();
    }
    
    // 4-тапшырманын функцияларын иштетүү
    loadCharacters();
    loadAnyData();
});
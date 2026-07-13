const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}

const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
let index = 0
let autoSliderId = null; 

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0
        slide.classList.remove('active_slide')
    })
}
const showSlide = (i = 0) => {
    if (slides.length > 0) {
        slides[i].style.opacity = 1
        slides[i].classList.add('active_slide')
    }
}

if (slides.length > 0) {
    hideSlide()
    showSlide(index)
}

const startAutoSlider = () => {
    if (slides.length > 0) {
        autoSliderId = setInterval(() => {
            index++
            if (index > slides.length - 1) {
                index = 0
            }
            hideSlide()
            showSlide(index)
        }, 3000) 
    }
}

const resetAutoSlider = () => {
    clearInterval(autoSliderId)
    startAutoSlider()
}

if (next) {
    next.onclick = () => {
        index < slides.length - 1 ? index++ : index = 0
        hideSlide()
        showSlide(index)
        resetAutoSlider() 
    }
}

if (prev) {
    prev.onclick = () => {
        index > 0 ? index-- : index = slides.length - 1
        hideSlide()
        showSlide(index)
        resetAutoSlider() 
    }
}

startAutoSlider()

const modal = document.querySelector('.modal')
const modalCloseButton = document.querySelector('.modal_close') 

const openModal = () => {
    if (modal) {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
    }
}

const closeModal = () => {
    if (modal) {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }
}

if (modalCloseButton) {
    modalCloseButton.onclick = () => closeModal()
}

if (modal) {
    modal.onclick = (event) => {
        if (event.target === modal) {
            closeModal()
        }
    }
}

const checkScrollEnd = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
        openModal()
        window.removeEventListener('scroll', checkScrollEnd)
    }
}
window.addEventListener('scroll', checkScrollEnd)

setTimeout(() => {
    if (modal && modal.style.display !== 'block') {
        openModal()
    }
}, 10000)
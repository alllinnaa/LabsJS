let headerEl = document.getElementById("header") // Зберігає елемент з ID "header" у змінну headerEl

// Додає обробник події "scroll" до вікна браузера
window.addEventListener("scroll", function() {
    const scrollPos = window.scrollY // Зберігає вертикальну позицію прокручування в змінну scrollPos
    if (scrollPos > 1) { // Якщо прокрутка більше 1 пікселя
        headerEl.classList.add("fixed") // Додає клас "fixed" до елемента headerEl
    } else { // Якщо прокрутка менше або дорівнює 1 пікселю
        headerEl.classList.remove("fixed") // Видаляє клас "fixed" з елемента headerEl
    }
})

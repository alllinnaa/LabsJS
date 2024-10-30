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

// Отримуємо елемент кнопки для показу меню за ID "show-menu"
let showMenu = document.querySelector("#show-menu"); 

// Отримуємо елемент прихованого меню за ID "hidden-menu"
let hiddenMenu = document.querySelector("#hidden-menu"); 

// Отримуємо елемент кнопки для закриття меню за класом "close"
let closeButton = document.querySelector(".close");

// Отримуємо навігаційний елемент за класом "nav"
let mainMenu = document.querySelector(".nav");

// Функція для перевірки ширини вікна та встановлення видимості елементів
function updateMenuDisplay() {
    let windowWidth = window.innerWidth; // Отримує ширину вікна
    if (windowWidth <= 992) { // Якщо ширина вікна менша або дорівнює 992 пікселям
        showMenu.style.display = "block"; // Відображає кнопку для бургер-меню
        mainMenu.style.display = "none"; // Приховує головне меню
        showMenu.addEventListener("click", function () { // Додає подію для відкриття меню при кліку
            hiddenMenu.style.right = '0'; // Відображає приховане меню, зміщуючи його праворуч
        });

        closeButton.addEventListener("click", function () { // Додає подію для закриття меню при кліку
            hiddenMenu.style.right = '-300px'; // Приховує меню, зміщуючи його ліворуч
        });
    } else {
        showMenu.style.display = "none"; // Приховує кнопку бургер-меню на великих екранах
        mainMenu.style.display = "block"; // Відображає головне меню
        hiddenMenu.style.right = '-300px'; // Приховує мобільне меню, якщо змінюється розмір екрану
    }
}

// Викликаємо функцію при завантаженні сторінки і зміні розміру вікна
window.addEventListener("load", updateMenuDisplay);
window.addEventListener("resize", updateMenuDisplay);

// Отримуємо елемент кнопки-стрілки для повернення на початок сторінки
let upBtn = document.querySelector(".up-btn");

// Додаємо обробник події "click" для кнопки-стрілки
upBtn.addEventListener("click", function () {
    // Прокручуємо сторінку до верхнього меню з плавною анімацією
    window.scrollTo({
        top: 0,            // Задаємо позицію прокрутки (0 - верх сторінки)
        behavior: "smooth" // Плавний ефект прокрутки
    });
});
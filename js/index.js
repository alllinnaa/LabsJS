//Лаба 2 (наліпаюче меню)
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

//Лаба 3 (меню для мобільних пристроїв, кнопка для повернення на початок сторінки)

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



// Лаба 4 (проміси)

// Масив URL для зображень галереї
const imgURLArr = [
    'images/make-up.jpg',
    'images/manikyur.jpg',
    'images/pricheska.jpg',
    'images/resnizi.jpg',
    'images/strizka.jpg'
];

// Масив для збереження промісів, які відображають стан завантаження кожного зображення
const promiseArr = [];

// Отримуємо посилання на галерею та спінер
const gallery = document.querySelector('.gallery');
const spinner = document.querySelector('.loader-dots');

// Показуємо спінер перед початком завантаження зображень
spinner.style.display = 'flex';

// Ітеруємо по масиву URL-адрес, створюючи проміси для кожного зображення
for (const url of imgURLArr) { 
    const promise = new Promise(function(resolve, reject) { 
        // Створюємо новий елемент зображення
        const img = document.createElement('img');
        img.classList.add("picture", "hidden"); // Додаємо класи для стилізації
        img.src = url; // Встановлюємо src зображення

        // Додаємо обробник події "load" для відстеження завершення завантаження зображення
        img.addEventListener("load", function() {
            resolve(); // Викликаємо resolve, якщо зображення завантажилося успішно
        });

        // Додаємо обробник події "error" для відстеження помилок завантаження
        img.addEventListener("error", function() {
            reject(); // Викликаємо reject, якщо завантаження зображення завершилося помилкою
        });

        // Додаємо зображення до галереї
        gallery.appendChild(img);
    });

    // Додаємо кожен проміс у масив промісів
    promiseArr.push(promise);
}

// Використовуємо Promise.all для обробки всіх промісів одночасно
Promise.all(promiseArr).then(
    function() { 
        // Якщо всі зображення завантажилися успішно, показуємо їх у галереї
        document.querySelectorAll('.picture').forEach(img => {
            img.classList.remove("hidden"); // Видаляємо клас "hidden"
            img.classList.add("show"); // Додаємо клас "show" для плавного відображення
        });
        spinner.style.display = "none"; // Приховуємо спінер після завершення завантаження
    },
    function() { 
        // Якщо завантаження будь-якого зображення завершилося помилкою, виводимо повідомлення
        alert("Помилка завантаження");
    }
);

// Лаба 5 (слайдер)

/* Встановлюємо стартовий індекс слайду за замовчуванням: */
let slideIndex = 1;
/* Викликаємо функцію, яка реалізована нижче: */
showSlides(slideIndex);

/* Збільшуємо індекс на 1 - показуємо наступний слайд: */
function nextSlide() {
    showSlides(slideIndex += 1);
}

/* Зменшуємо індекс на 1 – показуємо попередній слайд: */
function previousSlide() {
    showSlides(slideIndex -= 1);  
}


/* Функція перегортання: */
function showSlides(n) {
/* Звертаємось до елементів з назвою класу "item", тобто до картинок: */
    let slides = document.getElementsByClassName("item");
    
/* Перевіряємо кількість слайдів: */
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
  
/* Проходимо по кожному слайду в циклі for: */
    for (let slide of slides) {
        slide.style.display = "none";
    }
    /* Робимо елемент блоковим: */
    slides[slideIndex - 1].style.display = "block";    
}

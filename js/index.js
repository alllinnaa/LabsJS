//Лаба 2 (наліпаюче меню)
let headerEl = document.getElementById("header") // Зберігає елемент з ID "header" у змінну headerEl

// Додає обробник події "scroll" до вікна браузера
window.addEventListener("scroll", function () {
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
    const promise = new Promise(function (resolve, reject) {
        // Створюємо новий елемент зображення
        const img = document.createElement('img');
        img.classList.add("picture", "hidden"); // Додаємо класи для стилізації
        img.src = url; // Встановлюємо src зображення

        // Додаємо обробник події "load" для відстеження завершення завантаження зображення
        img.addEventListener("load", function () {
            resolve(); // Викликаємо resolve, якщо зображення завантажилося успішно
        });

        // Додаємо обробник події "error" для відстеження помилок завантаження
        img.addEventListener("error", function () {
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
    function () {
        // Якщо всі зображення завантажилися успішно, показуємо їх у галереї
        document.querySelectorAll('.picture').forEach(img => {
            img.classList.remove("hidden"); // Видаляємо клас "hidden"
            img.classList.add("show"); // Додаємо клас "show" для плавного відображення
        });
        spinner.style.display = "none"; // Приховуємо спінер після завершення завантаження
    },
    function () {
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


//Лаба 6 - анімовані кнопки
// Вибираємо кнопки на сторінці (включаючи кнопки з класом .up-btn)
const buttons = document.querySelectorAll("button, .up-btn");
// Вибираємо іконки соціальних мереж (всі div у контейнері з класом .social)
const socialIcons = document.querySelectorAll(".social div");

// Оптимізація анімації для кнопок при наведенні
buttons.forEach(button => {
    // Створюємо анімацію для збільшення кнопки при наведенні
    const hoverAnimation = anime({
        targets: button, // Цільовий елемент - кнопка
        scale: 1.1, // Збільшення розміру
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", // Зміна тіні
        borderRadius: "20px", // Зміна радіусу кутів
        duration: 300, // Тривалість анімації (300 мс)
        easing: "easeOutQuad", // Плавність переходу
        autoplay: false // Анімація не запускається автоматично
    });

    // Створюємо анімацію для повернення кнопки до початкового стану
    const leaveAnimation = anime({
        targets: button, // Цільовий елемент - кнопка
        scale: 1, // Початковий розмір
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)", // Початкова тінь
        borderRadius: "5px", // Початковий радіус кутів
        duration: 300, // Тривалість анімації (300 мс)
        easing: "easeOutQuad", // Плавність переходу
        autoplay: false // Анімація не запускається автоматично
    });

    // Запускаємо анімацію при наведенні курсору на кнопку
    button.addEventListener("mouseenter", () => hoverAnimation.restart());
    // Запускаємо анімацію повернення при виході курсору за межі кнопки
    button.addEventListener("mouseleave", () => leaveAnimation.restart());

    // Анімація при кліку на кнопку
    button.addEventListener("click", () => {
        // Створюємо таймлайн для послідовної анімації
        const timeline = anime.timeline({
            easing: "easeInOutSine", // Загальна плавність анімації
            duration: 500 // Базова тривалість для кожного кроку
        });

        // Додаємо зменшення розміру
        timeline.add({
            targets: button, // Цільовий елемент - кнопка
            scale: 0.9, // Зменшення розміру
            duration: 100 // Тривалість для цього кроку
        });

        // Додаємо збільшення розміру
        timeline.add({
            targets: button, // Цільовий елемент - кнопка
            scale: 1.2, // Збільшення розміру
            duration: 100 // Тривалість для цього кроку
        });

        // Додаємо повернення до початкового розміру
        timeline.add({
            targets: button, // Цільовий елемент - кнопка
            scale: 1, // Початковий розмір
            duration: 100 // Тривалість для цього кроку
        });

        // Додаємо обертання кнопки
        timeline.add({
            targets: button, // Цільовий елемент - кнопка
            rotate: "1turn", // Обертання на 360 градусів
            duration: 400 // Тривалість для цього кроку
        });

        // Додаємо зміну кольору кнопки
        timeline.add({
            targets: button, // Цільовий елемент - кнопка
            backgroundColor: "#F3A5D1", // Новий колір
            duration: 300 // Тривалість для цього кроку
        });
    });

});

// Анімація для іконок соціальних мереж
socialIcons.forEach(icon => {
    // Додаємо анімацію при наведенні курсору на іконку
    icon.addEventListener("mouseenter", () => {
        anime.remove(icon); // Скасування всіх попередніх анімацій для іконки
        anime({
            targets: icon, // Цільовий елемент - іконка
            scale: 1.5, // Збільшення розміру
            rotate: "0.5turn", // Поворот на 180 градусів
            color: "#FF69B4", // Зміна кольору тексту/іконки
            duration: 100, // Тривалість анімації (400 мс)
            easing: "easeOutElastic" // Еластична анімація (розтягування та стискання)
        });
    });

    // Додаємо анімацію для повернення іконки до початкового стану
    icon.addEventListener("mouseleave", () => {
        anime.remove(icon); // Скасування всіх попередніх анімацій для іконки
        anime({
            targets: icon, // Цільовий елемент - іконка
            scale: 1, // Повернення до початкового розміру
            rotate: "0turn", // Повернення до початкового обертання
            color: "#000", // Повернення до початкового кольору
            duration: 100, // Тривалість анімації (300 мс)
        });
    });
});


// Модальні вікна
const modal = document.getElementById("calculator-modal"); // Знаходимо модальне вікно за його ID
const openModalButton = document.getElementById("open-calculator"); // Кнопка для відкриття модального вікна
const closeModalButton = document.getElementById("close-modal"); // Кнопка для закриття модального вікна

// Відкрити/закрити модальне вікно
openModalButton.addEventListener("click", () => {
    modal.style.display = "block"; // Змінюємо стиль модального вікна, щоб воно стало видимим
    loadServicesIntoCalculator(); // Викликаємо функцію для динамічного завантаження послуг у модальне вікно
});

closeModalButton.addEventListener("click", () => {
    modal.style.display = "none"; // Ховаємо модальне вікно, змінюючи стиль
    clearForm(); // Викликаємо функцію очищення форми при закритті
});

// Завантаження послуг із HTML у модальне вікно
function loadServicesIntoCalculator() {
    const serviceList = document.querySelectorAll(".service-list .service"); // Збираємо всі елементи послуг з HTML
    const calculatorServices = document.querySelector(".calculator-services"); // Контейнер для послуг у модальному вікні
    calculatorServices.innerHTML = ""; // Очищуємо всі попередні записи в контейнері

    const servicesArray = Array.from(serviceList); // Перетворюємо NodeList у масив для зручної обробки
    const columns = Math.ceil(servicesArray.length / 5); // Розраховуємо кількість стовпців (максимум 5 послуг у кожному)
    const servicesPerColumn = Math.ceil(servicesArray.length / columns); // Розраховуємо, скільки послуг у кожному стовпці

    for (let i = 0; i < columns; i++) {
        const column = document.createElement("div"); // Створюємо новий елемент для стовпця
        column.classList.add("calculator-column"); // Додаємо клас для стилізації стовпця

        const start = i * servicesPerColumn; // Початок вибірки послуг для цього стовпця
        const end = start + servicesPerColumn; // Кінець вибірки послуг для цього стовпця

        servicesArray.slice(start, end).forEach(service => {
            const serviceName = service.querySelector("h4").textContent; // Отримуємо назву послуги з HTML
            const servicePrice = service.querySelector("p").textContent.match(/\d+/)[0]; // Витягуємо ціну послуги, використовуючи регулярний вираз

            const label = document.createElement("label"); // Створюємо новий елемент для чекбокса послуги
            label.innerHTML = `
                <input type="checkbox" value="${servicePrice}"> ${serviceName} - $${servicePrice}
            `;
            column.appendChild(label); // Додаємо елемент до стовпця
        });

        calculatorServices.appendChild(column); // Додаємо стовпець до контейнера калькулятора
    }
}

// Калькулятор
document.getElementById("calculate-price").addEventListener("click", () => {
    const selectedServices = document.querySelectorAll("#calculator-form input[type='checkbox']:checked"); // Отримуємо всі вибрані послуги (чекбокси)
    const phoneNumber = document.getElementById("phone-number").value; // Отримуємо значення введеного номера телефону
    const promoCode = document.getElementById("promo-code").value; // Отримуємо значення введеного промокоду

    const discounts = {
        phoneNumbers: ["123456789", "987654321", "555555555"], // Масив номерів телефону, які дають знижку
        promoCodes: ["DISCOUNT30"] // Масив діючих промокодів
    };

    let totalPrice = 0; // Початкове значення загальної ціни
    selectedServices.forEach(service => {
        totalPrice += parseFloat(service.value); // Додаємо вартість кожної вибраної послуги
    });

    // Перевірка знижок
    let discount = 0; // Початкове значення знижки
    if (discounts.phoneNumbers.includes(phoneNumber)) {
        discount += 10; // Якщо номер телефону є у списку, додаємо $10 знижки
    }
    if (discounts.promoCodes.includes(promoCode)) {
        discount += 30; // Якщо промокод є у списку, додаємо ще $10 знижки
    }

    const finalPrice = totalPrice - discount; // Розраховуємо кінцеву вартість з урахуванням знижок

    // Виводимо результати в HTML
    document.getElementById("calculation-result").innerHTML = `
        <p>Total Price: $${totalPrice.toFixed(2)}</p>
        <p>Discount: $${discount.toFixed(2)}</p>
        <p>Final Price: $${finalPrice.toFixed(2)}</p>
    `;
});

// Очистка форми
function clearForm() {
    document.querySelectorAll("#calculator-form input").forEach(input => {
        if (input.type === "checkbox") {
            input.checked = false; // Знімаємо вибір із усіх чекбоксів
        } else {
            input.value = ""; // Очищуємо текстові поля
        }
    });
    document.getElementById("calculation-result").innerHTML = ""; // Очищуємо область результатів
}

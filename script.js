document.querySelectorAll('.shortcut').forEach((button) => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling; // Находим следующий элемент после кнопки
        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "block"; // Показываем контент

            // Добавляем прокрутку к открытому блоку
            content.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            content.style.display = "none"; // Скрываем контент
        }
    });
});

document.querySelectorAll('.collapsible-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        // Сворачиваем/разворачиваем блок
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

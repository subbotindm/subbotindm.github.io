function toggleContent(element) {
    const content = element.nextElementSibling;

    // Сворачиваем/разворачиваем блок
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

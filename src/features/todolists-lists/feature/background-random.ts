export function getRandomColor() {
    // Генерируем случайный цвет в формате #RRGGBB
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const element = document.getElementById("todoBackground");

if (element) {
    element.style.backgroundColor = getRandomColor();
}

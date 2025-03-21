class Circle {
    private radius: number;
    private color: string;

    constructor(radius: number, color: string) {
        this.radius = radius;
        this.color = color;
    }

    // Метод для получения площади круга
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    // Метод для получения длины окружности
    getCircumference(): number {
        return 2 * Math.PI * this.radius;
    }

    // Метод для генерации HTML-кода с информацией о круге
    toHTML(): string {
        return `
            <div style="border: 2px solid ${this.color}; border-radius: 50%; width: ${this.radius * 2}px; height: ${this.radius * 2}px; display: flex; align-items: center; justify-content: center;">
                <p style="color: ${this.color};">
                    Радиус: ${this.radius}<br>
                    Площадь: ${this.getArea().toFixed(2)}<br>
                    Длина окружности: ${this.getCircumference().toFixed(2)}
                </p>
            </div>
        `;
    }
}

// Пример использования
const myCircle = new Circle(50, "blue");
console.log( myCircle.toHTML() )
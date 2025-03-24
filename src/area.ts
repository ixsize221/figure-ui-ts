class Point {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    // ЕСЛИ ТОЧКА Х и У положительные > 0, то все ок, иначе ошибка
    if (x >= 0 && y >= 0) {
      this.x = x;
      this.y = y;
    } else {
      throw new Error("Без отрицательных чисел плес");
    }
  }
}

abstract class Figure {
  public center;
  constructor(center: Point) {
    this.center = center;
  }
  abstract area(): number;
}

class Circle extends Figure {
  public radius; // радиус в метрах
  constructor(radius: number) {
    // на супер конструктор уходит центр фигуры -- точка 0, 0
    super(new Point(0, 0));
    this.radius = radius;
  }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
  perimetr(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Square extends Figure {
  public width: number; // ширина в метрах
  public height: number; // высота в метрах
  constructor(width: number, height: number) {
    // на супер конструктор уходит центр фигуры -- точка 0, 0
    super(new Point(0, 0));
    this.height = height;
    this.width = width;
  }
  area(): number {
    return this.width * this.height;
  }
}

// Создаем фигуры в массиве
let shapes: Figure[] = [
  new Circle(2), // Круг радиусом 2
  new Square(5, 6), // Квадрат 5*6
  new Square(3, 6), // Квадрат 3*6
];
// Или можем сразу посчитать площади
let areas: number[] = [
  new Circle(2).area(), // Площадь ≈ 12.57 м²
  new Square(5, 6).area(), // Площадь = 30 м²
  new Square(3, 6).area(), // Площадь = 18 м²
];

let circle1 = new Circle(60);
let circle2 = new Circle(140);
let circle3 = new Circle(9);
let kvadr1 = new Square(40, 40);

// НАПИСАТЬ ФУНКЦИЮ
// ПОСЧИТАТЬ ПЛОЩАДЬ КРУГА И ДИАМЕТР ,И ВЫВЕСТИ ИХ В ХТМЛ БЛОКАХ (блоки пока вывести в консоль, потом HTML сделаю у проекта)
// функция принимает: круг, еденицу измерения: м или см. если никакой не передели то метры по умолчанию. Возвращает строчку (string)
function outputHTML(circ: Circle, unit: "m" | "cm" = "m"): string {
  // в circ === тот круг который будем считать
  // в unit === "m" || unit === "cm" метры или сантиметры

  // Написать что если метры то ничего, а если unit ==="cm" то перевести метры в см
  //?????????????????????

  // Напиисать логику что вы выводите площадь и диметр. Возможно что то уже умеет считать класс?
  return `<div class="result">
                <h1>Диаметр круга   = ??????? метров//см </h1>
                <h1>Площадь круга   = ??????? метров//см^2 </h1>
            </div>`;
}
console.log(outputHTML(circle1, "cm")); // вывод HTML круга 1 в см
console.log(outputHTML(circle2, "m")); // вывод HTML круга 2 в м
console.log(outputHTML(circle3)); // вывод HTML круга 3 тоже в метрах, (они там по умолчанию в unit: "m" | "cm" = "m")

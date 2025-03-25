class Точка {
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

abstract class Фигура {
  public center;
  constructor(center: Точка) {
    this.center = center;
  }
  abstract площадь(): number;
}

class Круг extends Фигура {
  public radius; // радиус в метрах
  constructor(radius: number) {
    // на супер конструктор уходит центр фигуры -- точка 0, 0
    super(new Точка(0, 0));
    this.radius = radius;
  }
  площадь(): number {
    return Math.PI * this.radius * this.radius;
  }
  diametr(): number {
    return this.radius * 2;
  }
  perimetr(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Прямоугольник extends Фигура {
  public width: number; // ширина в метрах
  public height: number; // высота в метрах
  constructor(width: number, height: number) {
    // на супер конструктор уходит центр фигуры -- точка 0, 0
    super(new Точка(0, 0));
    this.height = height;
    this.width = width;
  }
  площадь(): number {
    return this.width * this.height;
  }
}

// Создаем фигуры в массиве
let shapes: Фигура[] = [
  new Круг(2), // Круг радиусом 2
  new Прямоугольник(5, 6), // Квадрат 5*6
  new Прямоугольник(3, 6), // Квадрат 3*6
];
// Или можем сразу посчитать площади
let areas: number[] = [
  new Круг(2).площадь(), // Площадь ≈ 12.57 м²
  new Прямоугольник(5, 6).площадь(), // Площадь = 30 м²
  new Прямоугольник(3, 6).площадь(), // Площадь = 18 м²
];

let circle1 = new Круг(60);
let circle2 = new Круг(140);
let circle3 = new Круг(9);
let kvadr1 = new Прямоугольник(40, 40); // Квадрат 40м*40м
let priam1 = new Прямоугольник(20, 60); // Квадрат 20м*60м
let priam2 = new Прямоугольник(100, 40); // Квадрат 100м*40м

function создатьHTML(прям: Прямоугольник, еденица: "м" | "см" = "м"): string {
  // в прям === тот прямоугольник который будем считать
  // в еденица === "м" || еденица === "см" метры или сантиметры

  // посчитай площадь и периметр. Возможно что то уже умеет считать класс?
  // Написать что если метры то ничего,
  // а если еденица ==="см" то перевести метры в см

  // Напиисать что вы выводите площадь и диметр.
  return `
  <div class="result">
       <h1>Периметр прямоугольника  = ??????? метров//см </h1>
       <h1>Площадь прямоугольника  = ??????? метров//см^2 </h1>
  </div>`;
}

console.log(создатьHTML(kvadr1, "см")); // вывод HTML круга 1 в см
console.log(создатьHTML(priam1, "м")); // вывод HTML круга 2 в м
console.log(создатьHTML(priam2)); // вывод HTML круга 3 тоже в метрах, (они там по умолчанию в unit: "m" | "cm" = "m")

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
  диаметр(): number {
    return this.radius * 2;
  }
  периметр(): number {
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
  периметр(): number {
    return this.height * 2 + this.width * 2;
  }
}

export { Точка, Фигура, Круг, Прямоугольник };

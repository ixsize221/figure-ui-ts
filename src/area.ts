// class Point {
//   private x: number;
//   protected y: number;
//   constructor(x: number, y: number) {
//     // ЕСЛИ ТОЧКА Х и У положительные > 0, то все ок, иначе ошибка
//     if (x >= 0 && y >= 0) {
//       this.x = x;
//       this.y = y;
//     } else {
//       throw new Error("Без отрицательных чисел плес");
//     }
//   }
// }

// abstract class Figure {
//   constructor(private center: Point) {}
//   abstract area(): number;
// }

// class Circle extends Figure {
//   constructor(private radius: number) {
//     super(new Point(0, 0));
//   }
//   area(): number {
//     return Math.PI * this.radius * this.radius;
//   }
//   perimetr(): number {
//     return 2 * Math.PI * this.radius;
//   }
// }

// function draw() {}

// // Класс AreaOutputter
// class AreaOutputter {
//   private shapes: Figure[];

//   constructor(shapes: Figure[]) {
//     this.shapes = shapes;
//   }

//   // Метод для вывода в HTML

// }

// function outputHTML(circle:Circle, unit: "m" | "cm" = "m"): string
// {
//     // на вход принимаем еденицу измерения и круг
//     // Напиисать логику что вы выводите радиус и диаметр
//     // Если ед измерения = метр то в метрах, иначе в СМ
//     ?????????????????????
//     return `<h1>Диаметр круга   = ??????? метров//см </h1>
//             <h1>Площадь круга   = ??????? метров//см </h1>`;
// }

// class Square extends Figure {
//   constructor(private width: number, private height: number) {
//     super(new Point(0, 0));
//   }
//   area(): number {
//     return this.width * this.height;
//   }
// }

// // Создаем фигуры
// let shapes: Figure[] = [
//   new Circle(2), // Площадь ≈ 12.57 м²
//   new Square(5, 6), // Площадь = 30 м²
//   new Square(3, 6), // Площадь = 18 м²
// ];

// class Circle {
//   radius: number;
//   color: string;

//   constructor(radius: number, color: string) {
//     this.radius = radius;
//     this.color = color;
//   }

//   // Метод для получения площади круга
//   getArea(): number {
//     return Math.PI * this.radius * this.radius;
//   }

//   // Метод для получения длины окружности
//   getCircumference(): number {
//     return 2 * Math.PI * this.radius;
//   }

//   // Метод для генерации HTML-кода с информацией о круге
//   toHTML(): string {
//     return `
//             <div style="border: 2px solid ${
//               this.color
//             }; border-radius: 50%; width: ${this.radius * 2}px; height: ${
//       this.radius * 2
//     }px; display: flex; align-items: center; justify-content: center;">
//                 <p style="color: ${this.color};">
//                     Радиус: ${this.radius}<br>
//                     Площадь: ${this.getArea().toFixed(2)}<br>
//                     Длина окружности: ${this.getCircumference().toFixed(2)}
//                 </p>
//             </div>
//         `;
//   }
// }

// class CirclePrinter {
//   // Метод для генерации HTML-кода с информацией о круге
//   static toHTML(circle: Circle): string {
//     return `
//             <div style="border: 2px solid ${
//               circle.color
//             }; border-radius: 50%; width: ${circle.radius * 2}px; height: ${
//       circle.radius * 2
//     }px; display: flex; align-items: center; justify-content: center;">
//                 <p style="color: ${circle.color};">
//                     Радиус: ${circle.radius}<br>
//                     Площадь: ${circle.getArea().toFixed(2)}<br>
//                     Длина окружности: ${circle.getCircumference().toFixed(2)}
//                 </p>
//             </div>
//         `;
//   }

//   // Метод для получения информации о круге в формате JSON
//   static toJSON(circle: Circle): string {
//     return JSON.stringify(
//       {
//         radius: circle.radius,
//         color: circle.color,
//         area: circle.getArea(),
//         circumference: circle.getCircumference(),
//       },
//       null,
//       2
//     ); // null и 2 добавляют форматирование для красивого вывода
//   }

//   // Метод для вывода информации о круге в консоль в формате JSON
//   static printJSON(circle: Circle): void {
//     console.log(this.toJSON(circle));
//   }
// }

// // Пример использования
// const myCircle = new Circle(50, "blue");
// console.log(CirclePrinter.toHTML(myCircle));

// // Вывод информации в формате JSON в консоль
// CirclePrinter.printJSON(myCircle);

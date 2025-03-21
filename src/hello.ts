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
//   // changeX(numb){
//   //   if (numb >= 0 ) {
//   //     this.x = numb
//   //   }
//   //   else {
//   //     throw new Error("Без отрицательных чисел плес")
//   //   }
//   // }
// }
// let a = new Point(10, 10);
// // a.x = -100
// // a.changeX(-100)

// class Shape {
//   color: string;
//   lineWidth: number;
//   constructor(color: string, lineWidth: number) {
//     this.color = color;
//     this.lineWidth = lineWidth;
//   }
// }

// class Rectangle extends Shape {
//   private _x1: number;
//   private _y1: number;
//   private _x2: number;
//   private _y2: number;
//   constructor(x1: number, y1: number, x2: number, y2: number) {
//     super("red", 1);
//     if (x1 >= 0 && x2 >= 0 && y1 >= 0 && y2 >= 0) {
//       this._x1 = x1;
//       this._y1 = y1;
//       this._x2 = x2;
//       this._y2 = y2;
//     } else {
//       throw new Error("Координаты должны быть >=0");
//     }
//   }
//   set x1(num: number) {
//     if (num >= 0) {
//       this._x1 = num;
//     } else {
//       throw new Error("Значение х1 отклонено");
//     }
//   }
//   get x1(): number {
//     return this._x1;
//   }
//   get x2(): number {
//     return this._x2;
//   }
//   get y1(): number {
//     return this._y1;
//   }
//   get y2(): number {
//     return this._y2;
//   }
//   set x2(num: number) {
//     if (num >= 0) {
//       this._x2 = num;
//     } else {
//       throw new Error("Значение х2 отклонено");
//     }
//   }
//   set y1(num: number) {
//     if (num >= 0) {
//       this._y1 = num;
//     } else {
//       throw new Error("Значение y1 отклонено");
//     }
//   }
//   set y2(num: number) {
//     if (num >= 0) {
//       this._y2 = num;
//     } else {
//       throw new Error("Значение y2 отклонено");
//     }
//   }
//   get длинна(): number {
//     return Math.abs(this._x2 - this._x1);
//   }
//   get высота(): number {
//     return Math.abs(this._y2 - this._y1);
//   }
//   get периметр(): number {
//     return this.высота * 2 + this.длинна * 2;
//   }
//   get info(): object {
//     return {
//       длинна: this.длинна,
//       высота: this.высота,
//       периметр: this.периметр,
//     };
//   }
// }
// let квадрат1 = new Rectangle(0, 0, 10, 10);
// let квадрат2 = new Rectangle(30, 0, 2000, 1000);
// квадрат2.x1 = 999;
// квадрат2.x2 = 0;
// квадрат2.y1 = 50;
// квадрат2.y2 = 1000;
// console.log(квадрат2);
// console.log(квадрат2.длинна);
// console.log(квадрат2.info);
// console.log(квадрат1.info);

// class Tringle extends Shape {
//   private _a: Point;
//   private _b: Point;
//   private _c: Point;
//   constructor(a: Point, b: Point, c: Point) {
//     super("green", 1);
//     this._a = a;
//     this._b = b;
//     this._c = c;
//   }
//   get a() {
//     return this._a;
//   }
//   get b() {
//     return this._b;
//   }
//   get c() {
//     return this._c;
//   }
// }

// class Circle extends Shape {
//   center: Point;
//   radius: number;
//   innerColor: string;

//   constructor(center: Point, radius: number, innerColor: string) {
//     super("blue", 3); // Тут вызываем конструктор фигур -- синяя, толщина = 3
//     this.center = center;
//     this.radius = radius;
//     this.innerColor = innerColor;
//   }
// }
// let круг1 = new Circle(new Point(10, 0), 50, "red");
// let треуг1 = new Tringle(new Point(0, 0), new Point(100, 0), new Point(0, 100));

// console.log(круг1, треуг1);

// // console.log("Привет, Вася!");
// // let a: number = 10;
// // console.log(a);

// // const myName: string = "John";
// // let isOK: boolean;
// // let array: number[];
// // let strArray: Array<string>;

// // isOK = true;
// // array = [1, 2, 3];
// // strArray = ["a", "b", "c"];
// // console.log(isOK);
// // console.log(array);
// // console.log(strArray);

// // function square(num: number): number {
// //   return num * num;
// // }
// // let result = square(10);

// // function printId(id: number | string): void {
// //   console.log(`Ваш ID: ${id}`);
// // }
// // printId(3789);
// // printId("#678ad");

// // class Line {
// //   толщина: number;
// //   цвет: "red" | "green" | "blue";
// //   старт: Point3D;
// //   конец: Point3D;
// //   get длинна(): number {
// //     let x1 = this.старт.x;
// //     let x2 = this.конец.x;
// //     let y1 = this.старт.y;
// //     let y2 = this.конец.y;
// //     let long = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
// //     return long;
// //   }
// //   constructor(
// //     толщина: number,
// //     цвет: "red" | "green" | "blue",
// //     старт: Point3D,
// //     конец: Point3D
// //   ) {
// //     this.толщина = толщина;
// //     this.цвет = цвет;
// //     this.старт = старт;
// //     this.конец = конец;
// //   }
// // }

// // let point2: Point3D = new Point3D(10, 20, 0);
// // console.log(point2);
// // let point3: Point3D = new Point3D(-1010, -520, 40);
// // console.log(point3);
// // let point4: Point3D = new Point3D(1000, -420, 56);
// // console.log(point4);
// // point4.x = -300;
// // console.log(point4);

// // let line2: Line = new Line(4, "red", point2, point4);
// // console.log(line2);

// // let line3: Line = new Line(1, "green", point2, point3);
// // console.log(line3);
// // console.log(line3.длинна);

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number, z: number) {
    // ЕСЛИ ТОЧКА Х и У положительные > 0, то все ок, иначе ошибка
    if (x >= 0 && y >= 0) {
      this.x = x;
      this.y = y;
    } else {
      this.x = Math.abs(x);
      this.y = Math.abs(y);
    }
  }
}

class Rectangle {
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;
  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  get длинна(): number {
    return Math.abs(this.x2 - this.x1);
  }
  get высота(): number {
    return Math.abs(this.y2 - this.y1);
  }
  get периметр(): number {
    return this.высота * 2 + this.длинна * 2;
  }
  get info(): object {
    return {
      длинна: this.длинна,
      высота: this.высота,
      периметр: this.периметр,
    };
  }
}
let квадрат1 = new Rectangle(0, 0, 10, 10);
let квадрат2 = new Rectangle(30, 0, -2000, 1000);
// квадрат2.x1 = -99999;
console.log(квадрат2);
console.log(квадрат2.длинна);
console.log(квадрат2.info);
console.log(квадрат1.info);

https://codesandbox.io/p/devbox/igorb-ts-blank-forked-3hkl2q
class Rect {
  startPoint: Point;
  width: number;
  height: number;
  constructor(?????????){
    this.???????? = ??????
    this.???????? = ??????
    this.???????? = ??????
  }
  get площадь():number{}
  get периметр():number{}
  get endPoint():Point{}
}

https://codesandbox.io/p/devbox/igorb-ts-blank-forked-3hkl2q




// console.log("Привет, Вася!");
// let a: number = 10;
// console.log(a);

// const myName: string = "John";
// let isOK: boolean;
// let array: number[];
// let strArray: Array<string>;

// isOK = true;
// array = [1, 2, 3];
// strArray = ["a", "b", "c"];
// console.log(isOK);
// console.log(array);
// console.log(strArray);

// function square(num: number): number {
//   return num * num;
// }
// let result = square(10);

// function printId(id: number | string): void {
//   console.log(`Ваш ID: ${id}`);
// }
// printId(3789);
// printId("#678ad");

// class Line {
//   толщина: number;
//   цвет: "red" | "green" | "blue";
//   старт: Point3D;
//   конец: Point3D;
//   get длинна(): number {
//     let x1 = this.старт.x;
//     let x2 = this.конец.x;
//     let y1 = this.старт.y;
//     let y2 = this.конец.y;
//     let long = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
//     return long;
//   }
//   constructor(
//     толщина: number,
//     цвет: "red" | "green" | "blue",
//     старт: Point3D,
//     конец: Point3D
//   ) {
//     this.толщина = толщина;
//     this.цвет = цвет;
//     this.старт = старт;
//     this.конец = конец;
//   }
// }

// let point2: Point3D = new Point3D(10, 20, 0);
// console.log(point2);
// let point3: Point3D = new Point3D(-1010, -520, 40);
// console.log(point3);
// let point4: Point3D = new Point3D(1000, -420, 56);
// console.log(point4);
// point4.x = -300;
// console.log(point4);

// let line2: Line = new Line(4, "red", point2, point4);
// console.log(line2);

// let line3: Line = new Line(1, "green", point2, point3);
// console.log(line3);
// console.log(line3.длинна);

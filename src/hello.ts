console.log("Привет, Вася!");
let a: number = 10;
console.log(a);

const myName: string = "John";
let isOK: boolean;
let array: number[];
let strArray: Array<string>;

isOK = true;
array = [1, 2, 3];
strArray = ["a", "b", "c"];
console.log(isOK);
console.log(array);
console.log(strArray);

function square(num: number): number {
  return num * num;
}
let result = square(10);

function printId(id: number | string): void {
  console.log(`Ваш ID: ${id}`);
}
printId(3789);
printId("#678ad");

class Point3D {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    // ЕСЛИ ТОЧКА Х и У положительные > 0, то все ок, иначе ошибка
    if (x >= 0 && y >= 0 && z >= 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    } else {
      this.x = Math.abs(x);
      this.y = Math.abs(y);
      this.z = Math.abs(z);
    }
  }
}
class Line {
  толщина: number;
  цвет: "red" | "green" | "blue";
  старт: Point3D;
  конец: Point3D;
  get длинна(): number {
    let x1 = this.старт.x;
    let x2 = this.конец.x;
    let y1 = this.старт.y;
    let y2 = this.конец.y;
    let long = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    return long;
  }
  constructor(
    толщина: number,
    цвет: "red" | "green" | "blue",
    старт: Point3D,
    конец: Point3D
  ) {
    this.толщина = толщина;
    this.цвет = цвет;
    this.старт = старт;
    this.конец = конец;
  }
}

let point2: Point3D = new Point3D(10, 20, 0);
console.log(point2);
let point3: Point3D = new Point3D(-1010, -520, 40);
console.log(point3);
let point4: Point3D = new Point3D(1000, -420, 56);
console.log(point4);
point4.x = -300;
console.log(point4);

let line2: Line = new Line(4, "red", point2, point4);
console.log(line2);

let line3: Line = new Line(1, "green", point2, point3);
console.log(line3);
console.log(line3.длинна);

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

function move(from: object, howLong: number) {}
function move(from: Point, howLong: Distance) {}

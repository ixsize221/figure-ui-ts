class Мебель {
  protected name: string;
  size: [number, number, number];
  protected _price: number;
  constructor(name: string, size: string, price: number) {
    this.name = name;
    let arr = size.split("х").map(Number);
    if (arr.length === 3) this.size = [arr[0], arr[1], arr[2]];
    this._price = price;
  }
}

class Стул extends Мебель {
  ножки: number;
  высота: number;
  спинка: boolean;
  constructor(
    названиеСтула: string,
    высота: number,
    спинка: boolean,
    цена: number,
    ножки: number = 4
  ) {
    super(названиеСтула, "30х60х140", цена);
    this.ножки = ножки;
    this.высота = высота;
    this.спинка = спинка;
  }
}

let стулПервый = new Стул("Класный стул №1", 50, true, 5000, 3);
let кожаныйСтул = new Стул("Кожаный стул", 45, false, 12000);

console.log(стулПервый, кожаныйСтул);

class Стол extends Мебель {
  private _ножки: number;
  private _площадьСтолешницы: number;
  constructor(
    названиеСтола: string,
    цена: number,
    площадьСтолешницы: number,
    ножки: number = 4
  ) {
    super(названиеСтола, "30х60х140", цена);
    this.ножки = ножки;
    this.площадьСтолешницы = площадьСтолешницы;
  }
  set ножки(num: number) {
    if (num > 0 && num <= 10) this._ножки = num;
    else throw new Error("Количество ножек не правильное");
  }
  set площадьСтолешницы(square: number) {
    this._площадьСтолешницы = square;
    if (square >= 0 && square <= 100000) this._площадьСтолешницы = square;
    else throw new Error("Площадь не правильная");
  }
  set price(num: number) {
    if (num >= 0 && num < 10000) this._price = num;
  }
}

let класныйСтол1 = new Стол("Из цельного бруса", 25000, 2000, 3);
let кухня1 = new Стол("Кухонный стол", 14000, 3000);
класныйСтол1.ножки = 5; // так работает
//класныйСтол1.ножки = 500; // а так не работает, не проходит проверку кол = 0 -- 10 на сеттере
класныйСтол1.price = 333;

класныйСтол1.площадьСтолешницы = 3333;
console.log(класныйСтол1, кухня1);

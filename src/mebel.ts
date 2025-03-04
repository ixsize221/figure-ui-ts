// https://codesandbox.io/p/devbox/kh-12-points-3hkl2q

class Мебель {
  name: string;
  size: [number, number, number];
  protected price: number;
  constructor(name: string, size: string, price: number) {
    this.name = name;
    let arr = size.split("х").map(Number);
    if (arr.length === 3) this.size = [arr[0], arr[1], arr[2]];
    this.price = price;
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
  площадьСтолешницы: number;
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
  
}

let класныйСтол1 = new Стол("Из цельного бруса", 25000, 2000, 3);
let кухня1 = new Стол("Кухонный стол", 14000, 3000);
класныйСтол1.ножки = 12; // так работает
//класныйСтол1.ножки = -4444; // а так не работает, не проходит проверку кол = 0 -- 10 на сеттере

класныйСтол1.площадьСтолешницы = 3333;
console.log(класныйСтол1, кухня1);

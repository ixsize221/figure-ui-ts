class Мебель {
  private name: string;
  private size: string;
  protected price: number;
  constructor(name: string, size: string, price: number) {
    this.name = name;
    this.size = size;
    this.price = price;
  }
  setPrice() {}
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
    if (ножки > 0 && ножки <= 10) this._ножки = ножки;
    else throw new Error("Количество ножек не правильное");
    this.площадьСтолешницы = площадьСтолешницы;
  }
  set ножки(num: number) {
    if (num > 0 && num <= 10) this._ножки = num;
    else throw new Error("Количество ножек не правильное");
  }
  changePrice(newPrice: number) {
    this.price = newPrice;
  }
}

let класныйСтол1 = new Стол("Из цельного бруса", 25000, 2000, 3);
let кухня1 = new Стол("Кухонный стол", 14000, 3000);
класныйСтол1.ножки = 5;
класныйСтол1.changePrice(40000);
класныйСтол1.price = 50000;
console.log(класныйСтол1, кухня1);

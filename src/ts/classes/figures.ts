import {ЛинейнаяЕдиница, ЛинейнаяВеличина, КвадратнаяВеличина }  from "./units"

class Точка {
  private x: number
  private y: number

  constructor(x: number, y: number) {
    if (x >= 0 && y >= 0) {
      this.x = x
      this.y = y
    } else {
      throw new Error('Без отрицательных чисел плес')
    }
  }
}

abstract class Фигура {
  public center: Точка

  constructor(center: Точка) {
    this.center = center
  }

  abstract площадь(): КвадратнаяВеличина
  abstract периметр?(): ЛинейнаяВеличина  
}

class Круг extends Фигура {
  public radius: ЛинейнаяВеличина // радиус в метрах

  constructor(radius: number) {
    super(new Точка(0, 0))
    this.radius = new ЛинейнаяВеличина(radius, "м") 
  }

  площадь(): КвадратнаяВеличина {
    return new КвадратнаяВеличина(Math.PI * this.radius.val * this.radius.val, "м²")
  }

  диаметр(): ЛинейнаяВеличина {
    return new ЛинейнаяВеличина( this.radius.val * 2, "м")
  }

  периметр(): ЛинейнаяВеличина {
    return new ЛинейнаяВеличина(2 * Math.PI * this.radius.val, "м")
  }
}

class Прямоугольник extends Фигура {
  public width: ЛинейнаяВеличина // ширина в метрах
  public height: ЛинейнаяВеличина // высота в метрах

  constructor(width: number, height: number) {
    super(new Точка(0, 0))
    this.height = new ЛинейнаяВеличина(height,"м")
    this.width = new ЛинейнаяВеличина(width,"м")
  }
  конвертироватьВЕдиницы(линейнаяЕдиница: ЛинейнаяЕдиница): Прямоугольник {
    const width = this.width.вЕдиницах(линейнаяЕдиница);
    const height = this.height.вЕдиницах(линейнаяЕдиница);
    
    return new Прямоугольник(width.val, height.val);
  }
  площадь(): КвадратнаяВеличина {
    return new КвадратнаяВеличина(this.width.val * this.height.val,"м²")
  }

  периметр(): ЛинейнаяВеличина {
    return new ЛинейнаяВеличина(this.height.val * 2 + this.width.val * 2,"м")
  }
}

export {
  Точка,
  Фигура,
  Круг,
  Прямоугольник,
  ЛинейнаяВеличина ,
  КвадратнаяВеличина ,
}


//abstract конвертироватьВЕдиницы(линейнаяЕдиница: ЛинейнаяЕдиница): Фигура;
// конвертироватьВЕдиницы(линейнаяЕдиница: ЛинейнаяЕдиница): Круг {
//   const radius = this.radius.вЕдиницах(линейнаяЕдиница);
  
//   return new Круг(radius.val);
// }
// единица: ЛинейнаяЕдиница = 'м'
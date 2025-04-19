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
  abstract периметр(): ЛинейнаяВеличина  
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


class Треугольник extends Фигура {
  public сторона1: ЛинейнаяВеличина
  public сторона2: ЛинейнаяВеличина
  public сторона3: ЛинейнаяВеличина

  constructor(a: number, b: number, c: number) {
    super(new Точка(0, 0))
    
    // Проверка на существование треугольника
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error('Такой треугольник не существует')
    }
    
    this.сторона1 = new ЛинейнаяВеличина(a, "м")
    this.сторона2 = new ЛинейнаяВеличина(b, "м")
    this.сторона3 = new ЛинейнаяВеличина(c, "м")
  }

  площадь(): КвадратнаяВеличина {
    // Формула Герона
    const p = this.периметр().val / 2
    const площадь = Math.sqrt(
      p * 
      (p - this.сторона1.val) * 
      (p - this.сторона2.val) * 
      (p - this.сторона3.val)
    )
    return new КвадратнаяВеличина(площадь, "м²")
  }

  периметр(): ЛинейнаяВеличина {
    return new ЛинейнаяВеличина(
      this.сторона1.val + this.сторона2.val + this.сторона3.val,
      "м"
    )
  }
}

// Улучшенный класс Круга (у вас уже есть, но добавим проверки)
class Круг extends Фигура {
  public radius: ЛинейнаяВеличина

  constructor(radius: number) {
    super(new Точка(0, 0))
    
    if (radius <= 0) {
      throw new Error('Радиус должен быть положительным')
    }
    
    this.radius = new ЛинейнаяВеличина(radius, "м") 
  }

  площадь(): КвадратнаяВеличина {
    return new КвадратнаяВеличина(
      Math.PI * this.radius.val * this.radius.val, 
      "м²"
    )
  }

  диаметр(): ЛинейнаяВеличина {
    return new ЛинейнаяВеличина(
      this.radius.val * 2, 
      "м"
    )
  }

  периметр(): ЛинейнаяВеличина {
    return new ЛинейнаяВеличина(
      2 * Math.PI * this.radius.val, 
      "м"
    )
  }
}

export {
  Точка,
  Фигура,
  Круг,
  Прямоугольник,
  Треугольник,
}


//abstract конвертироватьВЕдиницы(линейнаяЕдиница: ЛинейнаяЕдиница): Фигура;
// конвертироватьВЕдиницы(линейнаяЕдиница: ЛинейнаяЕдиница): Круг {
//   const radius = this.radius.вЕдиницах(линейнаяЕдиница);
  
//   return new Круг(radius.val);
// }
// единица: ЛинейнаяЕдиница = 'м'
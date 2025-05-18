import { Фигура } from "../фигура"
import {Точка} from "../абстрактное/точка"
import {ЛинейнаяВеличина, ЛинейнаяЕдиница, КвадратнаяВеличина} from "../../утилиты/единицыИзмерения"

export class Элипс extends Фигура {
    public majorAxis: ЛинейнаяВеличина; // большая полуось
    public minorAxis: ЛинейнаяВеличина; // малая полуось
  
    // Конструктор для чисел и единиц измерения
    constructor(majorAxis: number, minorAxis: number, unit?: ЛинейнаяЕдиница);
    // Конструктор для готовых линейных величин
    constructor(majorAxis: ЛинейнаяВеличина, minorAxis: ЛинейнаяВеличина);
    // Реализация конструктора
    constructor(
      major: number | ЛинейнаяВеличина,
      minor: number | ЛинейнаяВеличина,
      unit: ЛинейнаяЕдиница = "м"
    ) {
      // Подготовка величин если на конструктор переданы number-ы
       const [axis1, axis2] = ЛинейнаяВеличина.привестиКВеличинам([major, minor], unit);
  
      // Проверка единиц и выбор основной
      const основнаяЕдиница = ЛинейнаяВеличина.проверитьОднотипностьЕдиниц(axis1, axis2);
  
      // Установка центра фигуры и основнойЕдиницы на суперконструкторе
      super(new Точка(0, 0), основнаяЕдиница);  

      // Автоматически определяем большую и малую полуоси
      const [majorAxis, minorAxis] = axis1.val >= axis2.val 
        ? [axis1, axis2] 
        : [axis2, axis1];
      
      // Проверка существования
      Элипс.проверитьСуществование(majorAxis, minorAxis);
  
      // Присваиваем свойства
      this.majorAxis = majorAxis;
      this.minorAxis = minorAxis;
    }
  
    public static проверитьСпецифичныеУсловия(majorAxis: ЛинейнаяВеличина, minorAxis: ЛинейнаяВеличина): void {
      if (majorAxis.val < minorAxis.val) {
        throw new Error("Большая полуось должна быть больше малой");
      }
    }
  
    конвертироватьВЕдиницы(unit: ЛинейнаяЕдиница): Элипс {
      return new Элипс(
        this.majorAxis.вЕдиницах(unit),
        this.minorAxis.вЕдиницах(unit)
      );
    }
  
    площадь(): КвадратнаяВеличина {
      return new КвадратнаяВеличина(
        Math.PI * this.majorAxis.val * this.minorAxis.val,
        КвадратнаяВеличина.изЛинейнойЕдиницы(this.основнаяЕдиница)
      );
    }
    
    периметр(): ЛинейнаяВеличина {
      const a = this.majorAxis.val;
      const b = this.minorAxis.val;
      const h = ((a - b) / (a + b)) ** 2;
      return new ЛинейнаяВеличина(
        Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h))),
        this.основнаяЕдиница
      );
    }
  }
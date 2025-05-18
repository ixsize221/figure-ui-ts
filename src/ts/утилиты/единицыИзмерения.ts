// Все поддерживаемые единицы и их коэффициенты преобразования
const ЛинейныеКоэффициенты = {
    'мм': 0.001,
    'см': 0.01,
    'дм': 0.1,
    'м': 1,
    'км': 1000
  } as const;  // as const -- запрещаем менять поля объекта
  
  // Квадратные единицы (на основе линейных)
  const КвадратныеКоэфициенты = {
    'мм²': Math.pow(ЛинейныеКоэффициенты['мм'], 2),
    'см²': Math.pow(ЛинейныеКоэффициенты['см'], 2),
    'дм²': Math.pow(ЛинейныеКоэффициенты['дм'], 2),
    'м²': Math.pow(ЛинейныеКоэффициенты['м'], 2),
    'км²': Math.pow(ЛинейныеКоэффициенты['км'], 2),
    'га': 10000 // 1 гектар = 10 000 м²
  } as const; // as const -- запрещаем менять поля объекта
  
  type ЛинейнаяЕдиница = keyof typeof ЛинейныеКоэффициенты;
  type КвадратнаяЕдиница = keyof typeof КвадратныеКоэфициенты;
  
  class ЛинейнаяВеличина {
    constructor(
      private _val: number,
      private _unit: ЛинейнаяЕдиница
    ) {}  

    get unit():ЛинейнаяЕдиница{
      return this._unit 
    }

    set unit(any: ЛинейнаяЕдиница){
      throw new Error("Используй конвертацию единиц типа переменная.см или переменная.вЕдиницах('см'), не меняй их напрямую иначе все запорешь")
    }

    get val():number{
      return this._val 
    }

    set val(number){
      if (number <= 0) {
        throw new Error(`Линейная величина должна быть положительной (${number} ${this._unit})`);
      }
      this._val = number      
    }
   
    
    // Приватный метод для конвертации в метры
    private вМетрах(): number {
      return this.val * ЛинейныеКоэффициенты[this._unit];
    }
  
    // Универсальный метод преобразования
    вЕдиницах(targetUnit: ЛинейнаяЕдиница): ЛинейнаяВеличина {
      const вМетрах = this.вМетрах();
      const val = вМетрах / ЛинейныеКоэффициенты[targetUnit];
      return new ЛинейнаяВеличина(val, targetUnit);
    }
  
    get строкой(){ 
      return `${this.val.toFixed(3)} ${this._unit}`
    }

    public static проверитьОднотипностьЕдиниц(...величины: ЛинейнаяВеличина[]): ЛинейнаяЕдиница {
      if (величины.length === 0) {
        throw new Error("Не передано ни одной величины");
      }
      
      const перваяЕдиница = величины[0].unit;
      
      if (!величины.every(v => v.unit === перваяЕдиница)) {
        const полученныеЕдиницы = [...new Set(величины.map(v => v.unit))].join(', ');
        throw new Error(`Ожидались величины в "${перваяЕдиница}", но получены: ${полученныеЕдиницы}`);
      }
      
      return перваяЕдиница;
    }

    // Перегоняет числа в ЛинейнаяВеличина, если нужно
    public static привестиКВеличинам<T extends ЛинейнаяВеличина>(
      values: Array<number | T>, unit: ЛинейнаяЕдиница 
    ): T[] {
      
      return values.map(val => 
        typeof val === 'number' ? new ЛинейнаяВеличина(val, unit) as T : val
      );
    }
  
    // Опциональные геттеры для удобства
    get м()  { return this.вЕдиницах('м'); }
    get см() { return this.вЕдиницах('см'); }
    get мм() { return this.вЕдиницах('мм'); }
    get дм() { return this.вЕдиницах('дм'); }
    get км() { return this.вЕдиницах('км'); }
  }  
  
  class КвадратнаяВеличина {
    constructor(
      private _val: number,
      private _unit: КвадратнаяЕдиница
    ) {}

    get unit():КвадратнаяЕдиница{
      return this._unit 
    }

    set unit(any: КвадратнаяЕдиница){
      throw new Error("Используй конвертацию единиц типа переменная.см или переменная.вЕдиницах('см²'), не меняй их напрямую иначе все запорешь")
    }

    get val():number{
      return this._val 
    }

    set val(number){
      if (number <= 0) {
        throw new Error(`Квадратическая величина должна быть положительной (${number} ${this.unit})`);
      }
      this._val = number      
    }
  
    private вМетры(): number {
      return this.val * КвадратныеКоэфициенты[this.unit];
    }
  
    вЕдиницах(targetUnit: КвадратнаяЕдиница): КвадратнаяВеличина {
      const baseValue = this.вМетры();
      const convertedValue = baseValue / КвадратныеКоэфициенты[targetUnit];
      return new КвадратнаяВеличина(convertedValue, targetUnit);
    }
    
    get строкой(){ 
      return `${this.val.toFixed(3)} ${this.unit}`
    }

    public static изЛинейнойЕдиницы(линейнаяЕдиница: ЛинейнаяЕдиница): КвадратнаяЕдиница {
      const квадратная = `${линейнаяЕдиница}²`;
      if (!(квадратная in КвадратныеКоэфициенты)) {
        throw new Error(`Нет квадратной единицы для ${линейнаяЕдиница}`);
      }
      return квадратная as КвадратнаяЕдиница;
    }
  
    // Опциональные геттеры для удобства
    get мм() { return this.вЕдиницах('мм²'); }
    get см() { return this.вЕдиницах('см²'); }
    get дм() { return this.вЕдиницах('дм²'); }
    get м()  { return this.вЕдиницах('м²'); }
    get км() { return this.вЕдиницах('км²'); }
    get га() { return this.вЕдиницах('га'); }
  
  }  
  
 
  
export {ЛинейнаяЕдиница, КвадратнаяЕдиница, ЛинейнаяВеличина, КвадратнаяВеличина }  
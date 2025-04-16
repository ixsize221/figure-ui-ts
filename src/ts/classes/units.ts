// Все поддерживаемые единицы и их коэффициенты преобразования
const ЛинейныеКоэффициенты = {
    'мм': 0.001,
    'см': 0.01,
    'дм': 0.1,
    'м': 1,
    'км': 1000
  } as const;  // as const -- запрещаем менять поля объекта
  
  // Квадратные единицы (на основе линейных)
  const КвадратныеКоефициенты = {
    'мм²': Math.pow(ЛинейныеКоэффициенты['мм'], 2),
    'см²': Math.pow(ЛинейныеКоэффициенты['см'], 2),
    'дм²': Math.pow(ЛинейныеКоэффициенты['дм'], 2),
    'м²': Math.pow(ЛинейныеКоэффициенты['м'], 2),
    'км²': Math.pow(ЛинейныеКоэффициенты['км'], 2),
    'га': 10000 // 1 гектар = 10 000 м²
  } as const; // as const -- запрещаем менять поля объекта
  
  type ЛинейнаяЕдиница = keyof typeof ЛинейныеКоэффициенты;
  type КвадратнаяЕдиница = keyof typeof КвадратныеКоефициенты;
  
  class ЛинейнаяВеличина {
    constructor(
      public val: number,
      public unit: ЛинейнаяЕдиница
    ) {}  
   
    // Приватный метод для конвертации в метры
    private вМетрах(): number {
      return this.val * ЛинейныеКоэффициенты[this.unit];
    }
  
    // Универсальный метод преобразования
    вЕдиницах(targetUnit: ЛинейнаяЕдиница): ЛинейнаяВеличина {
      const вМетрах = this.вМетрах();
      const val = вМетрах / ЛинейныеКоэффициенты[targetUnit];
      return new ЛинейнаяВеличина(val, targetUnit);
    }
  
    get строкой(){ 
      return `${this.val} ${this.unit}`
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
      public readonly val: number,
      public readonly unit: КвадратнаяЕдиница
    ) {}
  
    private вМетры(): number {
      return this.val * КвадратныеКоефициенты[this.unit];
    }
  
    вЕдиницах(targetUnit: КвадратнаяЕдиница): КвадратнаяВеличина {
      const baseValue = this.вМетры();
      const convertedValue = baseValue / КвадратныеКоефициенты[targetUnit];
      return new КвадратнаяВеличина(convertedValue, targetUnit);
    }
    
    get строкой(){ 
      return `${this.val} ${this.unit}`
    }
  
    // Опциональные геттеры для удобства
    get мм() { return this.вЕдиницах('мм²'); }
    get см() { return this.вЕдиницах('см²'); }
    get дм() { return this.вЕдиницах('дм²'); }
    get м()  { return this.вЕдиницах('м²'); }
    get км() { return this.вЕдиницах('км²'); }
    get га() { return this.вЕдиницах('га'); }
  
  }
  
  
  
export {ЛинейнаяЕдиница, ЛинейнаяВеличина, КвадратнаяВеличина }  
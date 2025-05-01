import '../css/style.css' // Стили можно подключать как в html так и в TS
import { Точка, Фигура, Круг, Прямоугольник, Треугольник, Ромб, Элипс } from './фигуры'
import { ЛинейнаяЕдиница } from './абстракции/единицыИзмерения'

// определяем контейнер для отрисовки фигур
let контейнерСФигурами = document.querySelector('.figures-text-info')
if (!контейнерСФигурами) throw new Error('Контейнер не найден')
if (!(контейнерСФигурами instanceof HTMLElement)) {
  throw new Error('Элемент не является HTMLElement')
}

// Создаем фигуры в массиве
let shapes: Фигура[] = [
  new Круг(2), // Круг радиусом 2
  new Прямоугольник(5, 6), // Прямоугольник 5*6
  new Прямоугольник(3, 7), // Прямоугольник 3*6
]
// Или можем сразу посчитать площади
let areas: number[] = [
  new Круг(2).площадь().val, // Площадь ≈ 12.57 м²
  new Прямоугольник(5, 6).площадь().val, // Площадь = 30 м²
  new Прямоугольник(3, 9).площадь().val, // Площадь = 18 м²
]



function создатьHTML(фигура: Фигура): string {
  return `
  <div class="shape-card neon-card">
    ${создатьЗаголовок(фигура)}
    <div class="shape-content">
      ${создатьSVG(фигура)}
      ${создатьСвойства(фигура)}
    </div>
  </div>`;
}


// 1. Заголовок фигуры
function создатьЗаголовок(фигура: Фигура): string {
  return `
  <div class="shape-header">
    <h1 class="shape-title">${фигура.constructor.name}</h1>
  </div>`;
}

// 2. SVG визуализация
function создатьSVG(фигура: Фигура): string {
  const единица = фигура.основнаяЕдиница;

  if (фигура instanceof Прямоугольник) {
    const width = фигура.width.val.toFixed(2);
    const height = фигура.height.val.toFixed(2);
    return `
    <div class="shape-visual">
      <svg viewBox="0 0 200 120" class="shape-svg">
        <rect x="20" y="20" width="160" height="80" class="neon-rect"></rect>
        <text text-anchor="middle" class="dimension-text" x="50%" y="11%">${width} ${единица}</text>
        <text text-anchor="middle" dominant-baseline="middle" transform="rotate(90,180,60)" 
              class="dimension-text" x="180" y="42%">${height} ${единица}</text>
      </svg>
    </div>`;
  }

  else if (фигура instanceof Круг) {
    const radius = фигура.radius[единица].val.toFixed(2);
    return `
    <div class="shape-visual">
      <svg viewBox="0 0 200 200" class="shape-svg">
        <circle cx="100" cy="100" r="80" class="neon-circle"/>
        <line x1="100" y1="100" x2="180" y2="100" 
              stroke-dasharray="5,3" class="dimension-line"/>
        <text x="140" y="92" text-anchor="middle" class="dimension-text">
          ${radius}${единица}
        </text>
      </svg>
    </div>`;
  }

  else if (фигура instanceof Треугольник) {
    const sides = фигура.стороны.map(s => s[единица].val.toFixed(2));
    return `
    <div class="shape-visual">
      <svg viewBox="0 0 200 180" class="shape-svg">
        <path id="sideAB" d="M108.7,15 L188.7,155" fill="none"/>
        <path id="sideBC" d="M20,170 L180,170" fill="none"/>
        <path id="sideCA" d="M11.3,155 L91.3,15" fill="none"/>
        <polygon points="100,20 180,160 20,160" class="neon-triangle"/>
        <text><textPath href="#sideAB" startOffset="50%" text-anchor="middle" 
              class="dimension-text">${sides[0]}${единица}</textPath></text>
        <text><textPath href="#sideBC" startOffset="50%" text-anchor="middle"
              class="dimension-text">${sides[1]}${единица}</textPath></text>
        <text><textPath href="#sideCA" startOffset="50%" text-anchor="middle"
              class="dimension-text">${sides[2]}${единица}</textPath></text>
      </svg>
    </div>`;
  }

  else if (фигура instanceof Элипс) {
    const major = фигура.majorAxis[единица].val.toFixed(2);
    const minor = фигура.minorAxis[единица].val.toFixed(2);
    return `
    <div class="shape-visual">
      <svg viewBox="0 0 200 120" class="shape-svg">
        <ellipse cx="100" cy="60" rx="80" ry="40" class="neon-ellipse"/>
        <line x1="20" y1="60" x2="180" y2="60" class="dimension-line"/>
        <text x="33.33%" y="55" text-anchor="middle" class="dimension-text">
          ${major}${единица}
        </text>
        <text x="75%" y="50%" text-anchor="middle" dominant-baseline="middle"
              transform="rotate(90,130,40)" class="dimension-text">
          ${minor}${единица}
        </text>
        <line x1="100" y1="20" x2="100" y2="100" class="dimension-line"/>
      </svg>
    </div>`;
  }

  else if (фигура instanceof Ромб) {
    const side = фигура.side[единица].val.toFixed(2);
    const height = фигура.height[единица].val.toFixed(2);
    return `
    <div class="shape-visual">
      <svg viewBox="0 0 200 180" class="shape-svg">
        <polygon points="100,20 180,100 100,180 20,100" class="neon-rhombus"/>
        <line x1="100" y1="20" x2="100" y2="180" class="dimension-line"/>
        <text x="100" y="90" text-anchor="middle" dominant-baseline="middle"
              transform="rotate(90,100,100)" class="dimension-text">
          ${height}${единица}
        </text>
        <text x="140" y="52" text-anchor="middle" 
              transform="rotate(45,140,60)" class="dimension-text">
          ${side}${единица}
        </text>
      </svg>
    </div>`;
  }

  return ''; // fallback для неизвестных фигур
}

function создатьСвойства(фигура: Фигура): string {
  const единица = фигура.основнаяЕдиница;
  
  let специфичныеСвойства = '';

  if (фигура instanceof Прямоугольник) {
    специфичныеСвойства = `
      ${создатьСвойство("Ширина", фигура.width.val.toFixed(2), единица)}
      ${создатьСвойство("Высота", фигура.height.val.toFixed(2), единица)}`;
  }
  else if (фигура instanceof Круг) {
    специфичныеСвойства = создатьСвойство("Радиус", фигура.radius[единица].val.toFixed(2), единица);
  }
  else if (фигура instanceof Треугольник) {
    const sides = фигура.стороны.map(s => s[единица].val.toFixed(2)).join(', ');
    специфичныеСвойства = создатьСвойство("Стороны", sides, единица);
  }
  else if (фигура instanceof Элипс) {
    специфичныеСвойства = `
      ${создатьСвойство("Большая ось", фигура.majorAxis[единица].val.toFixed(2), единица)}
      ${создатьСвойство("Малая ось", фигура.minorAxis[единица].val.toFixed(2), единица)}`;
  }
  else if (фигура instanceof Ромб) {
    специфичныеСвойства = `
      ${создатьСвойство("Сторона", фигура.side[единица].val.toFixed(2), единица)}
      ${создатьСвойство("Высота", фигура.height[единица].val.toFixed(2), единица)}`;
  }

  return `
  <div class="shape-properties">
    ${специфичныеСвойства}
    ${создатьСвойство("Периметр", фигура.периметр().строкой, null, true)}
    ${создатьСвойство("Площадь", фигура.площадь().строкой, null, true)}
  </div>`;
}

function создатьСвойство(
  название: string,
  значение: string | number,
  единица: string | null = null,
  isCalculated: boolean = false
): string {
  const значениеСЕдиницей = typeof значение === 'number' 
    ? `${значение.toFixed(2)}${единица ? ` ${единица}` : ''}`
    : значение;

  return `
  <div class="property ${isCalculated ? 'main-property' : ''}">
    <span class="neon-property">${название}:</span> ${значениеСЕдиницей}
  </div>`;
}




// <h1>Прямоугольник ${прям.width[единица].val} х ${прям.height[единица].val} ${единица} </h1>

function HTMLвКонтейнер(html: string, div: HTMLElement = document.body): void {
  div.insertAdjacentHTML('beforeend', html)
}

// Наши фигуры
let circle1 = new Круг(6)
let circle2 = new Круг(14)
let circle3 = new Круг(9)
let kvadr1 = new Прямоугольник(40, 40) // Квадрат 40м*40м
let priam1 = new Прямоугольник(20, 60, "мм") // Прямоугольник 20м*60м
let priam2 = new Прямоугольник(100, 40) // Прямоугольник 100м*40м

// можно выводить что то в консоль
console.log(создатьHTML(kvadr1)) // вывод HTML квадрата1 в см
console.log(создатьHTML(priam1)) // вывод HTML прямоугольника2 в м
console.log(создатьHTML(priam2)) // вывод HTML прямоугольника3 тоже в метрах, (они там по умолчанию  еденица: "м" | "см" = "м")

// А можно создавать
let хтмлФигуры1 = создатьHTML(kvadr1)
let хтмлФигуры2 = создатьHTML(kvadr1)
let хтмлФигуры3 = создатьHTML(priam1)
let хтмлФигуры4 = создатьHTML(circle1)

// очищаем контейнер для отображения
контейнерСФигурами.innerHTML = ''
// засовываем в контейнер фигуры
HTMLвКонтейнер(хтмлФигуры1, контейнерСФигурами)
HTMLвКонтейнер(хтмлФигуры2, контейнерСФигурами)
HTMLвКонтейнер(хтмлФигуры3, контейнерСФигурами)
HTMLвКонтейнер(хтмлФигуры4, контейнерСФигурами)

HTMLвКонтейнер(создатьHTML(new Ромб(10, 15)), контейнерСФигурами)
HTMLвКонтейнер(создатьHTML(new Треугольник(3, 4, 5)), контейнерСФигурами)
HTMLвКонтейнер(создатьHTML(new Элипс(4, 3, "мм")), контейнерСФигурами)


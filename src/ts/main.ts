import '../css/style.css' // Стили можно подключать как в html так и в TS
import { Точка, Фигура, Круг, Прямоугольник, Треугольник, Ромб, Элипс } from './classes/figures'
import { ЛинейнаяЕдиница } from './classes/units'

// определяем контейнер для отрисовки фигур
let контейнерСФигурами = document.querySelector('.figures-text-info')
if (!контейнерСФигурами) throw new Error('Контейнер не найден')
if (!(контейнерСФигурами instanceof HTMLElement)) {
  throw new Error('Элемент не является HTMLElement')
}

// Создаем фигуры в массиве
let shapes: Фигура[] = [
  new Круг(2), // Круг радиусом 2
  new Прямоугольник(5, 6), // Квадрат 5*6
  new Прямоугольник(3, 7), // Квадрат 3*6
]
// // Или можем сразу посчитать площади
// let areas: number[] = [
//   new Круг(2).площадь(), // Площадь ≈ 12.57 м²
//   new Прямоугольник(5, 6).площадь(), // Площадь = 30 м²
//   new Прямоугольник(3, 9).площадь(), // Площадь = 18 м²
// ]

// в прям === тот прямоугольник который будем считать
// в еденица === "м" || еденица === "см" метры или сантиметры
function создатьHTML(фигура: Фигура): string {
  const периметр = фигура.периметр().строкой;
  const площадь = фигура.площадь().строкой;
  const единица = фигура.основнаяЕдиница

  // Определяем тип фигуры и специфические свойства
  let специфика = '';
  let svg = '';

  if (фигура instanceof Прямоугольник) {
    const width = фигура.width.val.toFixed(2);
    const height = фигура.height.val.toFixed(2);
    специфика = `
      <div class="property">
        <span class="neon-property">Ширина:</span> ${width} ${единица}
      </div>
      <div class="property">
        <span class="neon-property">Высота:</span> ${height} ${единица}
      </div>
    `;
    svg = `
    <svg viewBox="0 0 200 120" class="shape-svg">
      <rect x="20" y="20" width="160" height="80" class="neon-rect"></rect>
      <text text-anchor="middle" class="dimension-text" x="50%" y="11%">${width} ${единица}</text>
      <text text-anchor="middle" dominant-baseline="middle" transform="rotate(90,180,60)" class="dimension-text" x="180" y="42%">${height} ${единица}</text>
    </svg>
  `;

  }
  else if (фигура instanceof Круг) {
    const radius = фигура.radius[единица].val.toFixed(2);
    специфика = `
      <div class="property">
        <span class="neon-property">Радиус:</span> ${radius} ${единица}
      </div>
    `;
    svg = `
      <svg viewBox="0 0 200 200" class="shape-svg">
        <!-- Круг -->
        <circle cx="100" cy="100" r="80" class="neon-circle"/>
        
        <!-- Линия радиуса (от центра до края круга) -->
        <line x1="100" y1="100" x2="180" y2="100" 
              stroke-dasharray="5,3" 
              class="dimension-line"/>
        
        <!-- Текст с размером радиуса -->
        <text x="140" y="92" 
              text-anchor="middle"
              class="dimension-text">
          ${radius}${единица}
        </text>
      </svg>
    `;
  }
  else if (фигура instanceof Треугольник) {
    const sides = фигура.стороны.map(s => s[единица].val.toFixed(2));
    специфика = `
      <div class="property">
        <span class="neon-property">Стороны:</span> 
        ${sides[0]}, ${sides[1]}, ${sides[2]} ${единица}
      </div>
    `;
    svg = `
   <svg viewBox="0 0 200 180" class="shape-svg">
      <!-- Невидимые пути для текста (смещенные наружу) -->
        <path id="sideAB" d="M108.7,15 L188.7,155" fill="none"/>
        <path id="sideBC" d="M20,170 L180,170" fill="none"/>
        <path id="sideCA" d="M11.3,155 L91.3,15" fill="none"/>
      
      <!-- Сам треугольник (оригинальные размеры) -->
      <polygon points="100,20 180,160 20,160" class="neon-triangle"/>
      
      <!-- Текст вдоль сторон -->
      <text>
        <textPath href="#sideAB" startOffset="50%" text-anchor="middle" class="dimension-text">
          ${sides[0]}${единица}
        </textPath>
      </text>      
      
      <text>
        <textPath href="#sideBC" startOffset="50%" text-anchor="middle" class="dimension-text"
                  pathLength="100" lengthAdjust="spacingAndGlyphs" method="align">
          ${sides[1]}${единица}
        </textPath>
      </text>
      
      <text>
        <textPath href="#sideCA" startOffset="50%" text-anchor="middle" class="dimension-text">
          ${sides[2]}${единица}
        </textPath>
      </text>
    </svg>
    `;
  }
  else if (фигура instanceof Элипс) {
    const major = фигура.majorAxis[единица].val.toFixed(2);
    const minor = фигура.minorAxis[единица].val.toFixed(2);
    специфика = `
      <div class="property">
        <span class="neon-property">Большая ось:</span> ${major} ${единица}
      </div>
      <div class="property">
        <span class="neon-property">Малая ось:</span> ${minor} ${единица}
      </div>
    `;
    svg = `
      <svg viewBox="0 0 200 120" class="shape-svg">
        <!-- Эллипс -->
        <ellipse cx="100" cy="60" rx="80" ry="40" class="neon-ellipse"/>
        
        <!-- Линия большой оси (горизонтальная) -->
        <line x1="20" y1="60" x2="180" y2="60" class="dimension-line"/>
        
        <!-- Текст большой оси (в 1-й четверти) -->
        <text x="33.33%" y="55" 
              text-anchor="middle"
              class="dimension-text">
          ${major}${единица}
        </text>
        
        <!-- Текст МАЛОЙ оси в четверти 2 (повернут на 90°) -->
        <text x="75%" y="50%" 
              text-anchor="middle"
              dominant-baseline="middle"
              transform="rotate(90,130,40)"
              class="dimension-text">
          ${minor}${единица}
        </text>
        
        <!-- Линия малой оси (вертикальная, оставляем как было) -->
        <line x1="100" y1="20" x2="100" y2="100" class="dimension-line"/>
      </svg>
    `;
  }
  else if (фигура instanceof Ромб) {
    const side = фигура.side[единица].val.toFixed(2);
    const height = фигура.height[единица].val.toFixed(2);
    специфика = `
      <div class="property">
        <span class="neon-property">Сторона:</span> ${side} ${единица}
      </div>
      <div class="property">
        <span class="neon-property">Высота:</span> ${height} ${единица}
      </div>
    `;
    svg = `
     <svg viewBox="0 0 200 180" class="shape-svg">
        <!-- Ромб -->
        <polygon points="100,20 180,100 100,180 20,100" class="neon-rhombus"/>
        
        <!-- Линия высоты (вертикальная) -->
        <line x1="100" y1="20" x2="100" y2="180" class="dimension-line"/>
        
        <!-- Текст высоты (вертикальный, читается сверху вниз) -->
        <text x="100" y="90" 
              text-anchor="middle" 
              dominant-baseline="middle"
              transform="rotate(90,100,100)"
              class="dimension-text">
          ${height}${единица}
        </text>
        
        <!-- Текст стороны (расположен вдоль верхней стороны ромба) -->
        <text x="140" y="52" 
              text-anchor="middle"
              transform="rotate(45,140,60)"
              class="dimension-text">
          ${side}${единица}
        </text>
      </svg>
    `;
  }

  return `
  <div class="shape-card neon-card">
    <div class="shape-header">
      <h1 class="shape-title">${фигура.constructor.name}</h1>
    </div>
    
    <div class="shape-content">
      <div class="shape-visual">
        ${svg}
      </div>
      
      <div class="shape-properties">
        ${специфика}
        <div class="property main-property">
          <span class="neon-property">Периметр:</span> ${периметр}
        </div>
        <div class="property main-property">
          <span class="neon-property">Площадь:</span> ${площадь}
        </div>
      </div>
    </div>
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


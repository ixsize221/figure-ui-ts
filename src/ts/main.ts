import '../css/style.css' // Стили можно подключать как в html так и в TS
import { Фигура, Круг, Прямоугольник, Треугольник, Ромб, Элипс } from './геометрия'

abstract class РендерФигуры {
    constructor(protected фигура: Фигура) {}

    abstract создатьЗаголовок(): string;
    abstract создатьSVG(): string;
    abstract создатьУникальныеСвойства(): string;

    создатьСвойстваФигуры(): string {
        return `
        <div class="shape-properties">
            ${this.создатьУникальныеСвойства()}
            ${this.создатьВычисляемыеСвойства()}
        </div>`;
    }

    private создатьВычисляемыеСвойства(): string {
        return `
        ${this.создатьТекстовоеСвойство("Периметр", this.фигура.периметр().строкой, true)}
        ${this.создатьТекстовоеСвойство("Площадь", this.фигура.площадь().строкой, true)}`;
    }

   protected создатьЧисловоеСвойство(
        название: string,
        значение: number,
        единица: string,
        isMain = false
    ): string {
        return this.создатьСвойствоHTML(
            название,
            `${значение.toFixed(2)} ${единица}`,
            isMain
        );
    }
    
    protected создатьТекстовоеСвойство(
        название: string,
        значение: string,
        isMain = false
    ): string {
        return this.создатьСвойствоHTML(название, значение, isMain);
    }
    
    private создатьСвойствоHTML(
        название: string,
        значение: string,
        isMain: boolean
    ): string {
        return `
        <div class="property ${isMain ? 'main-property' : ''}">
            <span class="neon-property">${название}:</span> ${значение}
        </div>`;
    }

    создатьХТМЛФигуры(): string {
        return `
        <div class="shape-card neon-card">
            ${this.создатьЗаголовок()}
            <div class="shape-content">
                ${this.создатьSVG()}
                ${this.создатьСвойстваФигуры()}
            </div>
        </div>`;
    }
}
class РендерКруг extends РендерФигуры {
    создатьЗаголовок(): string {
        return `
        <div class="shape-header">
            <h1 class="shape-title">${this.фигура.constructor.name}</h1>
        </div>`;
    }

    создатьSVG(): string {
        const единица = this.фигура.основнаяЕдиница;
        const радиус = (this.фигура as Круг).radius[единица].val.toFixed(2);
        
        return `
        <div class="shape-visual">
            <svg viewBox="0 0 200 200" class="shape-svg">
                <circle cx="100" cy="100" r="80" class="neon-circle"/>
                <line x1="100" y1="100" x2="180" y2="100" 
                      stroke-dasharray="5,3" class="dimension-line"/>
                <text x="140" y="92" text-anchor="middle" class="dimension-text">
                    ${радиус}${единица}
                </text>
            </svg>
        </div>`;
    }

    создатьУникальныеСвойства(): string {
        const единица = this.фигура.основнаяЕдиница;
        const радиус = (this.фигура as Круг).radius[единица].val;
        return this.создатьЧисловоеСвойство("Радиус", радиус, единица);
    }
}

class РендерПрямоугольник extends РендерФигуры {
    создатьЗаголовок(): string {
        return `
        <div class="shape-header">
            <h1 class="shape-title">${this.фигура.constructor.name}</h1>
        </div>`;
    }

    создатьSVG(): string {
        const единица = this.фигура.основнаяЕдиница;
        const прямоугольник = this.фигура as Прямоугольник;
        const ширина = прямоугольник.width.val.toFixed(2);
        const высота = прямоугольник.height.val.toFixed(2);
        
        return `
        <div class="shape-visual">
            <svg viewBox="0 0 200 120" class="shape-svg">
                <rect x="20" y="20" width="160" height="80" class="neon-rect"></rect>
                <text text-anchor="middle" class="dimension-text" x="50%" y="11%">${ширина} ${единица}</text>
                <text text-anchor="middle" dominant-baseline="middle" transform="rotate(90,180,60)" 
                      class="dimension-text" x="180" y="42%">${высота} ${единица}</text>
            </svg>
        </div>`;
    }

    создатьУникальныеСвойства(): string {
        const прямоугольник = this.фигура as Прямоугольник;
        const единица = this.фигура.основнаяЕдиница;
        
        return `
        ${this.создатьЧисловоеСвойство("Ширина", прямоугольник.width.val, единица)}
        ${this.создатьЧисловоеСвойство("Высота", прямоугольник.height.val, единица)}`;
    }
}

class РендерТреугольник extends РендерФигуры {
    создатьЗаголовок(): string {
        return `
        <div class="shape-header">
            <h1 class="shape-title">${this.фигура.constructor.name}</h1>
        </div>`;
    }

    создатьSVG(): string {
        const единица = this.фигура.основнаяЕдиница;
        const стороны = (this.фигура as Треугольник).стороны.map(s => s[единица].val.toFixed(2));
        
        return `
        <div class="shape-visual">
            <svg viewBox="0 0 200 180" class="shape-svg">
                <path id="sideAB" d="M108.7,15 L188.7,155" fill="none"/>
                <path id="sideBC" d="M20,170 L180,170" fill="none"/>
                <path id="sideCA" d="M11.3,155 L91.3,15" fill="none"/>
                <polygon points="100,20 180,160 20,160" class="neon-triangle"/>
                <text><textPath href="#sideAB" startOffset="50%" text-anchor="middle" 
                      class="dimension-text">${стороны[0]}${единица}</textPath></text>
                <text><textPath href="#sideBC" startOffset="50%" text-anchor="middle"
                      class="dimension-text">${стороны[1]}${единица}</textPath></text>
                <text><textPath href="#sideCA" startOffset="50%" text-anchor="middle"
                      class="dimension-text">${стороны[2]}${единица}</textPath></text>
            </svg>
        </div>`;
    }

    создатьУникальныеСвойства(): string {
        const единица = this.фигура.основнаяЕдиница;
        const стороны = (this.фигура as Треугольник).стороны.map(s => s[единица].val.toFixed(2)+единица).join(', ');
        return this.создатьТекстовоеСвойство("Стороны", стороны);
    }
}

class РендерЭлипс extends РендерФигуры {
    создатьЗаголовок(): string {
        return `
        <div class="shape-header">
            <h1 class="shape-title">${this.фигура.constructor.name}</h1>
        </div>`;
    }

    создатьSVG(): string {
        const единица = this.фигура.основнаяЕдиница;
        const major = (this.фигура as Элипс).majorAxis[единица].val.toFixed(2);
        const minor = (this.фигура as Элипс).minorAxis[единица].val.toFixed(2);
        
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

    создатьУникальныеСвойства(): string {
        const единица = this.фигура.основнаяЕдиница;
        const major = (this.фигура as Элипс).majorAxis[единица].val;
        const minor = (this.фигура as Элипс).minorAxis[единица].val;
        
        return `
        ${this.создатьЧисловоеСвойство("Большая ось", major, единица)}
        ${this.создатьЧисловоеСвойство("Малая ось", minor, единица)}`;
    }
}

class РендерРомб extends РендерФигуры {
    создатьЗаголовок(): string {
        return `
        <div class="shape-header">
            <h1 class="shape-title">${this.фигура.constructor.name}</h1>
        </div>`;
    }

    создатьSVG(): string {
        const единица = this.фигура.основнаяЕдиница;
        const бок = (this.фигура as Ромб).side[единица].val.toFixed(2);
        const высота = (this.фигура as Ромб).height[единица].val.toFixed(2);
        
        return `
        <div class="shape-visual">
            <svg viewBox="0 0 200 180" class="shape-svg">
                <polygon points="100,20 180,100 100,180 20,100" class="neon-rhombus"/>
                <line x1="100" y1="20" x2="100" y2="180" class="dimension-line"/>
                <text x="100" y="90" text-anchor="middle" dominant-baseline="middle"
                      transform="rotate(90,100,100)" class="dimension-text">
                    ${высота}${единица}
                </text>
                <text x="140" y="52" text-anchor="middle" 
                      transform="rotate(45,140,60)" class="dimension-text">
                    ${бок}${единица}
                </text>
            </svg>
        </div>`;
    }

    создатьУникальныеСвойства(): string {
        const единица = this.фигура.основнаяЕдиница;
        const бок = (this.фигура as Ромб).side[единица].val;
        const высота = (this.фигура as Ромб).height[единица].val;
   
        return `
        ${this.создатьЧисловоеСвойство("Сторона", бок, единица)}
        ${this.создатьЧисловоеСвойство("Высота", высота, единица)}`;
    }
}

// Тут прописываем руками какой рендер для какой фигуры. Можно автоматизировать(Рендер+ИмяКласса)
class ФабрикаРендеровФигур {
    static нужныйРендер(фигура: Фигура): РендерФигуры {
        if (фигура instanceof Круг) return new РендерКруг(фигура);
        if (фигура instanceof Прямоугольник) return new РендерПрямоугольник(фигура);
        if (фигура instanceof Треугольник) return new РендерТреугольник(фигура);
        if (фигура instanceof Ромб) return new РендерРомб(фигура);
        if (фигура instanceof Элипс) return new РендерЭлипс(фигура);
        
        throw new Error(`Нет указаного рендера для типа фигуры: ${фигура.constructor.name}`);
    }
}

// определяем контейнер для отрисовки фигур
const контейнерСФигурами = document.querySelector('.figures-text-info');
if (!контейнерСФигурами || !(контейнерСФигурами instanceof HTMLElement)) {
    throw new Error('Контейнер не найден или не является HTMLElement');
}

// Очищаем контейнер
контейнерСФигурами.innerHTML = '';

// Создаем массив с фигурами
const фигуры: Фигура[] = [
    new Круг(6),
    new Прямоугольник(40, 40),
    new Прямоугольник(20, 60, "мм"),
    new Ромб(10, 15),
    new Треугольник(3, 4, 5),
    new Треугольник(4, 4, 7, "см"),
    new Элипс(4, 3, "мм")
];

// Рендерим все карточки фигур
фигуры.forEach(фигура => {
    const рендерер = ФабрикаРендеровФигур.нужныйРендер(фигура);
    const готовыйХТМЛ = рендерер.создатьХТМЛФигуры()
    контейнерСФигурами.insertAdjacentHTML('beforeend', готовыйХТМЛ );
});
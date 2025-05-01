export class Точка {
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
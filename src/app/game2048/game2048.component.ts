import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game2048',
  templateUrl: './game2048.component.html',
  styleUrls: ['./game2048.component.less']
})
export class Game2048Component implements OnInit {

  array: number[][];

  sizeArray: number;

  constructor() { }

  ngOnInit(): void {
    this.sizeArray = 2;
    this.array = this.createArray(this.sizeArray);
    this.array = this.randomInCeros(this.array,this.sizeArray);
    setTimeout(
      ()=>{
        this.array = this.moveRight(this.array);
      },
      1000
    );
  }

  public createArray(size: number):  number[][] {
    var i = 0;
    var matriz: number[][] = [];
    while (i < size) {
      let j = 0;
      while (j < size) {
        if (!matriz[i]) {
          matriz[i] = [];
        }
        matriz[i][j] = 0;
        j = j + 1;
      }
      i = i + 1;
    }
    console.log(matriz) 
    return matriz;
  }

  public getCeros(matriz,size) {
    let ceros = [];
    let i = 0;
    while (i < size) {
      let j = 0;
      while (j < size) {
        if (matriz[i][j]==0) {
         ceros.push({'i':i,'j':j});
        }
        j = j + 1;
      }
      i = i + 1;
    }
    return ceros;
  }

  //condicion de termino del juego
  public isEnd(matriz,size) {
    let ceros = this.getCeros(matriz,size);
    if (ceros.length===0) {
      return true;
    }
    else {
      return false;
    }
  }

  public randomNumber(array: number[][]): number[][] {
    var matriz :number[][];
    return matriz;
  }

  public randomInCeros(matriz: number[][], size: number): number[][] {
    let ceros = this.getCeros(matriz,size);
    let selected = Math.floor(Math.random() * (ceros.length - 0)) + 0;
    let i = ceros[selected]['i'];
    let j = ceros[selected]['j'];
    matriz[i][j] = 2;
    return matriz;
  }

  public moveRight(array: number[][]): number[][] {
    let matriz: number[][]=[];

    debugger;
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matriz[index] = this.moveRightRow(row);
    }
    return matriz
  }

  public moveLeft(array: number[][]): number[][] {
    let matriz: number[][];
    return matriz
  }

  public moveUp(array: number[][]): number[][] {
    let matriz: number[][];
    return matriz
  }

  public moveDown(array: number[][]): number[][] {
    let matriz: number[][];
    return matriz
  }

  public moveRightRow(array:number[]):number[] {
    let newRow: number[] = [];
    for (let elem of array) {
      newRow.push(0);
    }
    var i = array.length -1;
    debugger;
    while (i>0) {
      if (array[i]===0) {
        let j = i-1; 
        while (j>=0) {
          if (array[j]!=0) {
            array[i]=array[j];
            array[j]=0;
            j = -2;
            i = i-1;
          }
          j = j-1;
        }
        if (j!=-2){
          i = i-1;
        }
      }
    }
    return newRow;
  }

}

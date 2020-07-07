import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game2048',
  templateUrl: './game2048.component.html',
  styleUrls: ['./game2048.component.less']
})
export class Game2048Component implements OnInit {

  array: number[][];

  sizeArray: number;

  countMoviments: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.sizeArray = 2;
    //this.array = this.createArray(this.sizeArray);
    //this.array = this.randomInCeros(this.array,this.sizeArray);
    this.array = [
      [4,0,0,4,8],
      [4,0,0,4,8],
      [4,0,0,4,8],
      [4,0,0,4,8],
      [4,0,0,4,8]
    ];
    
    setTimeout(
      ()=>{this.array = this.moveLeft(this.array);
      },1000);
    
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
    this.countMoviments += 1;
    let matriz: number[][]=[];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matriz[index] = this.moveRightRow(row);
    }
    return matriz
  }

  public moveLeft(array: number[][]): number[][] {
    this.countMoviments += 1;
    let matriz: number[][];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matriz[index] = this.moveLeftRow(row);
    }
    return matriz
  }

  public moveUp(array: number[][]): number[][] {
    this.countMoviments += 1;
    let matriz: number[][];
    return matriz
  }

  public moveDown(array: number[][]): number[][] {
    this.countMoviments += 1;
    let matriz: number[][];
    return matriz
  }

  public moveRightRow(array:number[]):number[] {
    var i = array.length -1;
    var countRev=0;
    while (i>0 && countRev<array.length) {
      if (array[i]===0) {
        array.splice(i, 1);
        array.unshift(0);
        i=i+1;
      }
      countRev +=1
      debugger;
      i = i-1;
    }
    i = array.length -1;
    while (i>0){
      if (array[i]==0){
        i=-2;
      }
      else{
        if (array[i] == array[i-1]) {
          array[i]=array[i-1]+array[i];
          array.splice(i-1, 1);
          array.unshift(0);
        }
      }
      i = i-1;
    }
    return array;
  }

  public moveLeftRow(array:number[]):number[] {
    return array;
  }

}

import { Component, OnInit,HostListener } from '@angular/core';

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
    this.sizeArray = 4;
    this.array = this.createArray(this.sizeArray);
    this.array = this.randomInCeros(this.array,this.sizeArray);

    /*
    setTimeout(
      ()=>{this.array = this.moveUp(this.array);
      },1000);
    */
  }

  public control(key) {
    console.log(key);
  }

  @HostListener('keyup', ['$event'])
    onKeyup(event: KeyboardEvent) {
        // console.log(event);

        if(
               event.keyCode == 38 // arrow up
            || event.keyCode == 40 // arrow down
            || event.keyCode == 37 // arrow left
            || event.keyCode == 39 // arrow right        
        ) {         
            event.preventDefault();              
            this.host.checked = true;
            // TODO: send event
            this.host.change.emit(null);
            // setTimeout(() => {
            // }, 500);
        }
    }

  public clickUp() {
    this.array = this.moveUp(this.array);
    this.array = this.randomInCeros(this.array,this.sizeArray);
    if (this.isEnd()) {
      console.log("termino el juego");
      return;
    }
  }

  public clickDown() {
    this.array = this.moveDown(this.array);
    this.array = this.randomInCeros(this.array,this.sizeArray);
    if (this.isEnd()) {
      console.log("termino el juego");
      return;
    }
  }

  public clickLeft() {
    this.array = this.moveLeft(this.array);
    this.array = this.randomInCeros(this.array,this.sizeArray);
    if (this.isEnd()) {
      console.log("termino el juego");
      return;
    }
  }

  public clickRight() {
    this.array = this.moveRight(this.array);
    this.array = this.randomInCeros(this.array,this.sizeArray);
    if (this.isEnd()) {
      console.log("termino el juego");
      return;
    }
  }




  public createArray(size: number):  number[][] {
    var i = 0;
    var matrix: number[][] = [];
    while (i < size) {
      let j = 0;
      while (j < size) {
        if (!matrix[i]) {
          matrix[i] = [];
        }
        matrix[i][j] = 0;
        j = j + 1;
      }
      i = i + 1;
    }
    console.log(matrix) 
    return matrix;
  }

  public getCeros(matrix,size) {
    let ceros = [];
    let i = 0;
    while (i < size) {
      let j = 0;
      while (j < size) {
        if (matrix[i][j]==0) {
         ceros.push({'i':i,'j':j});
        }
        j = j + 1;
      }
      i = i + 1;
    }
    return ceros;
  }

  //condicion de termino del juego
  public isEnd(matrix,size) {
    let ceros = this.getCeros(matrix,size);
    if (ceros.length===0) {
      return true;
    }
    else {
      return false;
    }
  }

  public randomInCeros(matrix: number[][], size: number): number[][] {
    let ceros = this.getCeros(matrix,size);
    let selected = Math.floor(Math.random() * (ceros.length - 0)) + 0;
    let i = ceros[selected]['i'];
    let j = ceros[selected]['j'];
    matrix[i][j] = 2;
    return matrix;
  }

  public moveRight(array: number[][]): number[][] {
    this.countMoviments += 1;
    let matrix: number[][]=[];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matrix[index] = this.moveRightRow(row);
    }
    return matrix
  }

  public moveLeft(array: number[][]): number[][] {
    this.countMoviments += 1;
    let matrix: number[][]=[];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matrix[index] = this.moveLeftRow(row);
    }
    return matrix
  }

  public moveUp(array: number[][]): number[][] {
    this.countMoviments += 1;
    array = this.transpose(array);
    let matrix: number[][]=[];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matrix[index] = this.moveLeftRow(row);
    }
    return this.transpose(matrix);
  }

  public moveDown(array: number[][]): number[][] {
    this.countMoviments += 1;
    array = this.transpose(array);
    let matrix: number[][]=[];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matrix[index] = this.moveRightRow(row);
    }
    return this.transpose(matrix);
  }


  /* También esta función resuelve movimientos Down mediante transpose*/
  public moveRightRow(array:number[]): number[] {
    var i = array.length -1;
    var countRev=0;
    while (i>0 && countRev<array.length) {
      if (array[i]===0) {
        array.splice(i, 1);
        array.unshift(0);
        i=i+1;
      }
      countRev +=1
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

   /* También esta función resuelve movimientos UP mediante transpose */
  public moveLeftRow(array:number[]):number[] {
    var i = 0;
    var countRev=0;
    while (i<array.length && countRev<array.length) {
      if (array[i]===0) {
        array.splice(i, 1);
        array.push(0);
        i=i-1;
      }
      countRev +=1
      i = i+1;
    }
    i = 0;
    while (i<array.length){
      if (array[i]==0){
        i=array.length +1;
      }
      else{
        if (array[i] == array[i+1]) {
          array[i]=array[i+1]+array[i];
          array.splice(i+1, 1);
          array.push(0);
        }
      }
      i = i+1;
    }
    return array;
  }

  transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
  }

}

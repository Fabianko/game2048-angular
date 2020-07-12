import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-game2048',
  templateUrl: './game2048.component.html',
  styleUrls: ['./game2048.component.less']
})
export class Game2048Component implements OnInit {

  array: number[][];

  inputSize = new FormControl(
    4,
    [
      Validators.min(3),
      Validators.max(15),
      Validators.pattern('[0-9]*')
    ],[]);

  endGame = false;

  sizeArray: number = 2;

  countMoviments: number = 0;

  history:number[][][] = [];

  constructor() { }

  ngOnInit(): void {
    this.configInit();
  }

  public configInit(){
    this.array = this.createArray(this.sizeArray);
    this.array = this.randomInCeros(this.array,this.sizeArray);
    this.history.push([...this.array]);
  }


  public backButton() {
    this.array = [...this.history[this.countMoviments-1]];
    this.endGame=false;
    this.countMoviments-=1;
  }

  public changeSize() {
    console.log(this.inputSize);
    if (this.inputSize.status === "VALID") {
      this.sizeArray = this.inputSize.value;
      this.configInit();
    }
    
  }


  public clickUp() {
    let temp = Array.from(this.array);
    let temp2 = this.moveUp(this.array);
    if (temp.toString() == temp2.toString()) {
      console.log("iguales: ",temp,temp2);
      return 0;
    }
    else{
      this.array = Array.from(temp2);
      this.countMoviments += 1;
      this.array = this.randomInCeros(this.array,this.sizeArray);
      this.history.push([...this.array]);
      if (this.isEnd(this.array,this.sizeArray)) {
        console.log("termino el juego");
        this.endGame=true;
        return 0;
      }
    }
  }

  public clickDown() {
    let temp = Array.from(this.array);
    let temp2 = this.moveDown(this.array);
    if (temp.toString() == temp2.toString()) {
      console.log("iguales: ",temp,temp2);
      return 0;
    }
    else {
      this.array=Array.from(temp2);
      this.countMoviments += 1;
      this.array = this.randomInCeros(this.array,this.sizeArray);
      this.history.push([...this.array]);
      if (this.isEnd(this.array,this.sizeArray)) {
        console.log("termino el juego");
        this.endGame=true;
        return 0;
      }
    }
    
  }

  public clickLeft() {
    let temp = Array.from(this.array);
    let temp2 = [...this.moveLeft(this.array)];
    if (temp.toString() == temp2.toString()) {
      console.log("iguales: ",temp,temp2);
      return 0;
    }
    else{
      this.array = Array.from(temp2);
      this.countMoviments += 1;
      this.array = this.randomInCeros(this.array,this.sizeArray);
      this.history.push([...this.array]);
      if (this.isEnd(this.array,this.sizeArray)) {
        console.log("termino el juego");
        this.endGame=true;
        return 0;
      }
    }
    
  }

  public clickRight() {
    let temp = Array.from(this.array);
    let temp2 = [...this.moveRight(this.array)];
    if (temp.toString() == temp2.toString()) {
      console.log("iguales: ",temp,temp2);
      return 0;
    }
    else {
      this.array=Array.from(temp2);
      this.countMoviments += 1;
      this.array = this.randomInCeros(this.array,this.sizeArray);
      this.history.push([...this.array]);
      if (this.isEnd(this.array,this.sizeArray)) {
        console.log("termino el juego");
        this.endGame=true;
        return 0;
      }
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
    if (ceros.length==0) {
      return matrix;
    }
    let selected = Math.floor(Math.random() * (ceros.length - 0)) + 0;
    let i = ceros[selected]['i'];
    let j = ceros[selected]['j'];
    matrix[i][j] = 2;
    return matrix;
  }

  public moveRight(array: number[][]): number[][] {
    
    let matrix: number[][]=[];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matrix[index] = this.moveRightRow(row);
    }
    return matrix
  }

  public moveLeft(array: number[][]): number[][] {
    let matrix: number[][]=[];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matrix[index] = this.moveLeftRow(row);
    }
    return matrix
  }

  public moveUp(array: number[][]): number[][] {
    array = this.transpose(array);
    let matrix: number[][]=[];
    for (let index = 0; index < array.length; index++) {
      const row = array[index];
      matrix[index] = this.moveLeftRow(row);
    }
    return this.transpose(matrix);
  }

  public moveDown(array: number[][]): number[][] {
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

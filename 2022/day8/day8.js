const {readFileSync} = require('fs');

function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\r?\n/);
    for (let i=0; i < contents.length; i++){
        contents[i]=contents[i].split('');
    }
    contents.pop()
    return contents;
  }

function isVisible(inputs, line, column) { //check if the tree on line, column is visible
    height = inputs[line][column];
    let isVisibleTop = true;
    let isVisibleBottom = true;
    let isVisibleRight = true;
    let isVisibleLeft = true;
    for (let i=line+1; i < inputs.length; i++){ //let's check on the column to the bottom
        if (inputs[i][column]>=height){
            isVisibleBottom = false;
        }
    }
    for (let i=0; i < line; i++){ //then on the column to the top
        if (inputs[i][column]>=height){
            isVisibleTop = false;
        }
    }
    for (let j=column+1; j < inputs[0].length; j++){ //then on the line to the right
        if (inputs[line][j]>=height){
            isVisibleRight = false;
        }
    }
    for (let j=0; j < column; j++){ //then on the line to the left
        if (inputs[line][j]>=height){
            isVisibleLeft = false;
        }
    }
    return isVisibleTop || isVisibleBottom || isVisibleLeft || isVisibleRight;
    
}

//main

inputs = readFile('./input.txt');
let numVisible = 2*inputs.length + 2*(inputs[0].length-2); //the trees at the size are already visible

for (let i=1; i < inputs.length-1; i++){ //we aren't checking for first and last line
    for (let j=1; j < inputs[i].length-1; j++){ //same for column
        if (isVisible(inputs, i, j))
        numVisible += 1;
    }   
}

//console.log(numVisible)

//part 2

function amountVisible(inputs, line, column) { //check how many trees the tree on line, column can see
    height = inputs[line][column];
    let scenicScore = 1;
    let numVisibleTop = 1;
    let numVisibleBottom = 1;
    let numVisibleRight = 1;
    let numVisibleLeft = 1;
    for (let i=line+1; i < inputs.length-1; i++){ //let's check on the column to the bottom
        if (inputs[i][column]>=height){
            break;
        } else {
            numVisibleBottom += 1;
        }
    }
    scenicScore *= numVisibleBottom;
    for (let i=line-1; i > 0; i--){ //then on the column to the top
        if (inputs[i][column]>=height){
            break;
        } else {
            numVisibleTop += 1;
        }
    }
    scenicScore *= numVisibleTop;
    for (let j=column+1; j < inputs[0].length-1; j++){ //then on the line to the right
        if (inputs[line][j]>=height){
            break;
        } else {
            numVisibleRight += 1;
        }
    }
    scenicScore *= numVisibleRight;
    for (let j=column-1; j>0; j--){ //then on the line to the left
        if (inputs[line][j]>=height){
            break;
        } else {
            numVisibleLeft += 1;
        }
    }
    scenicScore *= numVisibleLeft;
    return scenicScore;
}

let scenicScores = new Array;

for (let i=1; i < inputs.length-1; i++){
    for (let j=1; j < inputs[i].length-1; j++){
        scenicScores.push(amountVisible(inputs,i,j));
    }   
}

var max_of_array = Math.max.apply(Math, scenicScores);
console.log(max_of_array);
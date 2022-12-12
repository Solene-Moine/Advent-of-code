//this doesn't actually work, I just wasted some time on it

const {readFileSync} = require('fs');

function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\r?\n/);
    contents.pop();
    for (let i=0; i<contents.length; i++){
        contents[i] = contents[i].split('');
    }
    return contents;
}

function generateRandomLetter() {
    let alphabet = "UDLR"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

function getNextChar(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
}

class Trail{
    constructor(matrix){
        this.matrix = matrix;
        for (let i=0; i<this.matrix.length; i++){
            for (let j=0; j<this.matrix[0].length; j++){
                if (this.matrix[i][j] == 'S'){
                    this.startY = i;
                    this.startX = j;
                }
                else if (this.matrix[i][j] == 'E'){
                    this.endY = i;
                    this.endX = j;
                }
            }
        }
        this.currentX = this.startX;
        this.currentY = this.startY;
        this.currentHeight = 'a';
        this.length = 0;
    }

    tryMove(direction){ //direction is either U,D,L or R
        if (direction == 'U' && this.currentY != 0){//We make sure we're not on the border of the map
            let newHeight = this.matrix[this.currentY-1][this.currentX];
            if (newHeight != '' && newHeight <= getNextChar(this.currentHeight)){ //we won't step on a position we've already stepped on, it would be a waste of time.
                this.matrix[this.currentY][this.currentX] = ''; //we mark the spot we've left
                this.currentHeight = newHeight;
                this.currentY -= 1;
                this.length += 1;
            } else {
                return 'useless' //if we couldn' move, then the move was useless
            }
        }
        else if (direction == 'D' && this.currentY != this.matrix.length-1){
            let newHeight = this.matrix[this.currentY+1][this.currentX];
            if (newHeight != '' && newHeight <= getNextChar(this.currentHeight)){
                this.matrix[this.currentY][this.currentX] = '';
                this.currentHeight = newHeight;
                this.currentY += 1;
                this.length += 1;
            } else {
                return 'useless'
            }
        }
        else if (direction == 'L' && this.currentX != 0){
            let newHeight = this.matrix[this.currentY][this.currentX-1];
            if (newHeight != '' && newHeight <= getNextChar(this.currentHeight)){
                this.matrix[this.currentY][this.currentX] = '';
                this.currentHeight = newHeight;
                this.currentX -= 1;
                this.length += 1;
            } else {
                return 'useless'
            }
        }
        else if (direction == 'R' && this.currentX != this.matrix[0].length-1){
            let newHeight = this.matrix[this.currentY][this.currentX+1];
            if (newHeight != '' && newHeight <= getNextChar(this.currentHeight)){
                this.matrix[this.currentY][this.currentX] = '';
                this.currentHeight = newHeight;
                this.currentX += 1;
                this.length += 1;
            } else {
                return 'useless'
            }
        } else {
            return 'useless' //if we couldn' move, then the move was useless
        }


        if (this.currentX == this.endX && this.currentY == this.endY){
            return 'end'
        }
    }

    display(){
        console.log(this.matrix)
    }
}

//main
let lengths = new Array();

for (let j = 0; j<1000; j++){ //we try 1000 different trail
    let trail = new Trail(readFile('./input2.txt'));
    let i = 0;
    let foundIt = false;
    while (i<40){ //if we changed position more than there are spots on the map then the trail is wrong
        direction = generateRandomLetter();
        Goal = trail.tryMove(direction);
        if (Goal == 'end'){
            foundIt == true;
            break //no need to keep moving if we've already reached the end
        }
        else if (Goal != 'useless'){ //we don't increment if we didn't actually move
            i+=1;
        }
    }
    if (foundIt){ //if we reached the end, we keep the length of the trail
        lengths.push(trail.length);
    }
}
console.log(lengths);



const {readFileSync} = require('fs');

function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\r?\n/);
    return contents;
}

class Cave{

    constructor(rocks){ //take as an argument the emplacement of rocks as written in our input
        this.shift = 300; //the shift is used to convert horizontal coordinate into smaller number, 400 for the full input, 490 for the exemple
        this.matrix = Array(200).fill().map(()=>Array(400).fill('.')); //create a matrix 200x80 filled with dots (30x25 for example)
        this.matrix[0][500 - this.shift] = '+';
        this.floorLine = new Set(); //part 2
        for (let line of rocks){
            line = line.split(' -> ');
            for (let i=0; i<line.length-1; i++){
                this.traceLine(line[i],line[i+1])
            }
        }
        this.traceFloor(); //part 2
    }

    traceLine(coord1, coord2){
        coord1 = coord1.split(',');
        coord2 = coord2.split(',');
        if (coord1[0] == coord2[0]){ //trace line vertically
            let start = Math.min(Number(coord1[1]),Number(coord2[1]))
            for (let i=0; i<Math.abs(coord1[1] - coord2[1])+1; i++){
                this.matrix[start+i][Number(coord1[0])-this.shift] = '#';
                this.floorLine.add(start+i); //part 2
            }
        } else { //trace line horizontally
            let start = Math.min(Number(coord1[0]),Number(coord2[0]))
            this.floorLine.add(Number(coord1[1])); //part 2
            for (let i=0; i<Math.abs(coord1[0] - coord2[0])+1; i++){
                this.matrix[Number(coord1[1])][start + i - this.shift] = '#';
            }
        }
    }

    traceFloor(){ //part 2
        let floorY = Math.max.apply(this, [...this.floorLine]) + 2;
        for (let i=0; i<this.matrix[0].length; i++){
            this.matrix[floorY][i] = '#';
        }
    }

    display(matrix = this.matrix){
        let matrixRep = '';
        for (let line of matrix){
            for (let pixel of line){
                matrixRep = matrixRep + pixel;
            }
            console.log(matrixRep);
            matrixRep = '';
        }
    }
}

class SandPile{

    constructor(cave){
        this.cave = cave
        this.restCounter = 0;
        this.currentX = 500 - this.cave.shift;
        this.currentY = 0;
    }

    fall(currentX=this.currentX,currentY=this.currentY,fallDown = 0){
        /* 
        //part 1
        if (fallDown >= 20){
            return false ; //we can assume we're falling indifinitely
        }
        */

        if (this.isEmpty(currentX,currentY+1)){
            this.fall(currentX,currentY+1,fallDown+1)
        } else if (this.isEmpty(currentX-1,currentY+1)){
            this.fall(currentX-1,currentY+1)
        } else if (this.isEmpty(currentX+1,currentY+1)){
            this.fall(currentX+1,currentY+1)
        } else {
            this.rest(currentX,currentY)
        }
    }

    isEmpty(x,y){
        return (this.cave.matrix[y][x] == '.');
    }

    rest(x,y){
        if (x == 500 - this.cave.shift && y == 0){
            return false;
        }
        this.cave.matrix[y][x] = 'o';
        this.restCounter += 1;
    }
}

//main
let inputs = readFile('./input.txt');
let cave = new Cave(inputs);
let sandPile = new SandPile(cave);
for (let i=0; i<30000; i++){
    sandPile.fall();
}
//cave.display()
console.log(sandPile.restCounter + 1);

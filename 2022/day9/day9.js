const {readFileSync} = require('fs');

function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\r?\n/);
    contents.pop()
    return contents
  }

  function includesArray(matrix, arr){
    matrix = JSON.stringify(matrix);
    arr = JSON.stringify(arr);
    return (matrix.indexOf(arr) != -1) //true if arr is in matrix
    
  }
  
class Rope{
    constructor(head_x, head_y){ //initially, head and tail overlap
        this.head_x = head_x;
        this.head_y = head_y;
        this.tail_x = head_x;
        this.tail_y = head_y;
        this.positionTakenTail = new Array;
    }

    moveHead(direction){
        if (direction == 'U'){
            this.head_y+=1
        }
        else if (direction == 'D'){
            this.head_y-=1
        }
        else if (direction == 'R'){
            this.head_x+=1
        }
        else if (direction == 'L'){
            this.head_x-=1
        }
        this.updateTail() //everytime the head move, we have to update the position of the tail
    }

    onSameColumn(){
        return this.head_x == this.tail_x
    }   
    
    onSameLine(){
        return this.head_y == this.tail_y
    }   

    updateTail(){ 
        if (this.onSameColumn() && Math.abs(this.head_y-this.tail_y)>1) {
            this.tail_y += (this.head_y-this.tail_y)/2;
        }
        else if (this.onSameLine() && Math.abs(this.head_x-this.tail_x)>1) {
            this.tail_x += (this.head_x-this.tail_x)/2;
        }
        else if (!this.onSameLine() && Math.abs(this.head_x-this.tail_x)>1){
            this.tail_x+=(this.head_x-this.tail_x)/2;
            this.tail_y+=this.head_y-this.tail_y;
        }
        else if (!this.onSameColumn() && Math.abs(this.head_y-this.tail_y)>1){
            this.tail_y+=(this.head_y-this.tail_y)/2;
            this.tail_x+=this.head_x-this.tail_x;
        }
    }

    followInstructions(arr){
        for (let instruction of arr){
            instruction = instruction.split(' ');
            for (let i=0; i < Number(instruction[1]); i++){
                this.moveHead(instruction[0]);
                if (!includesArray(this.positionTakenTail, [this.tail_x, this.tail_y])){
                    this.positionTakenTail.push([this.tail_x, this.tail_y])
                }
            }
        }
        return this.positionTakenTail
    }

}

//main
let inputs = readFile('./input.txt');
let rope = new Rope(0,0)
//console.log(rope.followInstructions(inputs).length);

//part 2
class LongRope{
    constructor(head_x, head_y){ //initially, head and tail overlap
        this.head_x = head_x;
        this.head_y = head_y;
        for(let i = 1; i < 10; i++) {
            eval('this.node' + i + '_x = ' + this.head_x + ';'); //eval create a dynamic variable name, allows me to create node1_x, node2_x, node3_x... more efficiently
            eval('this.node' + i + '_y = ' + this.head_y + ';');
        }
        this.nodes = [[this.head_x,this.head_x],[this.node1_x,this.node1_y],[this.node2_x,this.node2_y],[this.node3_x,this.node3_y],[this.node4_x,this.node4_y],[this.node5_x,this.node5_y],[this.node6_x,this.node6_y],[this.node7_x,this.node7_y],[this.node8_x,this.node8_y],[this.node9_x,this.node9_y]];
        this.positionTaken9 = new Array;
    }

    moveHead(direction){
        if (direction == 'U'){
            this.nodes[0][1]+=1
        }
        else if (direction == 'D'){
            this.nodes[0][1]-=1
        }
        else if (direction == 'R'){
            this.nodes[0][0]+=1
        }
        else if (direction == 'L'){
            this.nodes[0][0]-=1
        }
        this.updateNextNode(1) //everytime the head move, we have to update the position of the next node
    }

    onSameColumn(index){
        return this.nodes[index-1][0] == this.nodes[index][0]
    }   
    
    onSameLine(index){
        return this.nodes[index-1][1] == this.nodes[index][1]
    }   

    updateNextNode(index){
        if (this.onSameColumn(index) && Math.abs(this.nodes[index-1][1]-this.nodes[index][1])>1) {
            this.nodes[index][1] += (this.nodes[index-1][1]-this.nodes[index][1])/2;
        }
        else if (this.onSameLine(index) && Math.abs(this.nodes[index-1][0]-this.nodes[index][0])>1) {
            this.nodes[index][0] += (this.nodes[index-1][0]-this.nodes[index][0])/2;
        }
        else if (!this.onSameLine(index) && Math.abs(this.nodes[index-1][0]-this.nodes[index][0])>1){
            this.nodes[index][0]+=(this.nodes[index-1][0]-this.nodes[index][0])/2;
            this.nodes[index][1]+=this.nodes[index-1][1]-this.nodes[index][1];
        }
        else if (!this.onSameColumn(index) && Math.abs(this.nodes[index-1][1]-this.nodes[index][1])>1){
            this.nodes[index][1]+=(this.nodes[index-1][1]-this.nodes[index][1])/2;
            this.nodes[index][0]+=this.nodes[index-1][0]-this.nodes[index][0];
        }
        console.log(this.nodes[4]);
        if (index < 9){
            this.updateNextNode(index+1) //if we're not at the end yet, we have to keep updating the position of the next node
        }
    }

    followInstructions(arr){
        for (let instruction of arr){
            instruction = instruction.split(' ');
            for (let i=0; i < Number(instruction[1]); i++){
                this.moveHead(instruction[0]);
                if (!includesArray(this.positionTaken9, [this.nodes[9][0], this.nodes[9][1]])){
                    this.positionTaken9.push([this.nodes[9][0], this.nodes[9][1]])
                }
            }
        }
        return this.positionTaken9
    }

}

let newRope = new LongRope(0,0)
console.log(newRope.followInstructions(inputs).length);
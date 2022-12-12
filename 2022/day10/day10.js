const {readFileSync} = require('fs');

function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\r?\n/);
    contents.pop()
    return contents
  }

class CPU{
    constructor(){
        this.x = 1;
        this.cycle = 0;
        this.strength = 0;
        this.screen = new Array();
    }

    noop(){
        this.updateCycle()
    }

    addx(int){
        this.updateCycle()
        this.updateCycle()
        this.x += int;
    }

    updateCycle(){
        this.cycle += 1;
        if ((this.cycle-20)%40==0){
            this.strength += this.cycle * this.x;
        }
        else if (this.cycle%40 == 0){
            this.cycle = 0;
        }
        if ([this.x,this.x+2,this.x+1].includes(this.cycle)){
            this.screen.push('#');
        } else {
            this.screen.push('.');
        }
        
    }

    followInstruction(instruction){
        instruction = instruction.split(' ');
        if (instruction[0] == "noop") {
            this.noop();
        } else {
            this.addx(Number(instruction[1]));
        }
    }

    display(){
        let screenRep = '';
        console.log("part 2 :");
        for (let pixel of this.screen){
        screenRep = screenRep + pixel
           if (screenRep.length%40 == 0){
            console.log(screenRep);
            screenRep = '';
           }
        }
    }
}

//main
let inputs = readFile('./input.txt');
let cpu = new CPU();
for (instruction of inputs){
    cpu.followInstruction(instruction);
}
console.log('part 1 : the sum of all strength is ' + cpu.strength + '\n');
cpu.display();
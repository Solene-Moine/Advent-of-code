const { performance } = require('perf_hooks');
const {readFileSync} = require('fs');
function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\r?\n/);
    contents.pop();
    for (let [index, value] of contents.entries()){
        contents[index] = [Number(value),index]; //that way every entry is unique
    }
    return contents;
}

class CircularArray{

    constructor(normalArray){
        this.circularArray = normalArray;
        this.length = this.circularArray.length;
    }

    circularIndex(index){
        return (index % this.length + this.length) % this.length
    }

    findIndex(key){
        for (let [index, value] of this.circularArray.entries()){
            if (value[1] == key){
                return index;
            }
        }
    }

    insert(element, index){
        this.circularArray.splice(this.circularIndex(index), 0, element)
    }

    moveRight(key){
        let index = this.findIndex(key);
        if (this.circularIndex(index) == this.length-1){
            let movingNumber = this.circularArray.pop();
            this.insert(movingNumber, 1)
        } else {
            let movingNumber = this.circularArray[this.circularIndex(index)]
            this.circularArray.splice(this.circularIndex(index),1);
            this.insert(movingNumber, this.circularIndex(index + 1));
        }
    }

    moveLeft(key){
        let index = this.findIndex(key);
        if (this.circularIndex(index) == 0){
            let movingNumber = this.circularArray.shift();
            this.insert(movingNumber, this.length-2)
        } else {
            let movingNumber = this.circularArray[this.circularIndex(index)]
            this.circularArray.splice(this.circularIndex(index),1);
            this.insert(movingNumber, this.circularIndex(index - 1));
        }
    }

    move(key, amount){
        if (amount>=0){
            for (let i = 0; i < amount; i++){
                this.moveRight(key);
            }
        } 
        else {
            for (let i = 0; i < Math.abs(amount); i++){
                this.moveLeft(key);
            }
        }
    }

    mix(){
        for (let key=0; key<this.length; key++) {
            let trueIndex = this.findIndex(key);
            this.move(key, this.circularArray[this.circularIndex(trueIndex)][0]);
        }
    }

    valueAfter0(number){
        let valueArr = new Array();
        this.circularArray.forEach(element => valueArr.push(element[0]));
        let index0 = valueArr.indexOf(0);
        return this.circularArray[this.circularIndex(index0 + number)][0];
    } 

    display(){
        let str = '';
        for (let element of this.circularArray){ str = str + String(element[0]) + ', ';}
        console.log(str);
    }
}


//main

var startTime = performance.now(); //to know how much time the program takes to excecute

let inputs = readFile('./input2.txt');
let circularArray = new CircularArray(inputs)
circularArray.mix();

console.log((circularArray.valueAfter0(1000) + circularArray.valueAfter0(2000) + circularArray.valueAfter0(3000)));

 
var endTime = performance.now()
console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)

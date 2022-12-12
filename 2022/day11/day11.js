const {readFileSync} = require('fs');
/*
function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\n\s*\n/);
    contents.pop();
    return contents;
}
*/

class Monkey{
    constructor(items, operation, test, monkeyTrue, monkeyFalse, monkeyNum){ //items and operation are arrays, test, monkeyTrue and MonkeyFalse numbers
        this.items = items;
        this.test = test;
        this.monkeyTrue = monkeyTrue;
        this.monkeyFalse = monkeyFalse;
        this.monkeyNum = monkeyNum;
        this.operation = operation; //looks like this : ['+', '2'], ['*', '13'], ['**', '2']
        this.inspection = 0;
    }

    inspect(){ //the monkey inspect the first item of his list
        if (this.items.length > 0){
            let item = this.items.shift();
            eval('item = item' + this.operation[0] + Number(this.operation[1]) + ';');
            item = Math.floor(item/3);
            this.testThrow(item)
            this.inspection += 1;
        }
    }

    testThrow(item){
        if (item % this.test == 0){
            this.throw(item, this.monkeyTrue);
        } else {
            this.throw(item, this.monkeyFalse);
        }
    }

    throw(item, monkeyNum){
        let monkey = game.monkeys[monkeyNum]
        monkey.receive(item);
        this.inspect();
    }

    receive(item){
        this.items.push(item);
    }
}

class Game{
    constructor(monkeys){
        this.numberTurn = 1;
        this.monkeys = monkeys;
    }

    turn(){
        for (let monkey of this.monkeys){
            console.log(monkey.inspection);
            monkey.inspect();
        }
        this.numberTurn += 1;
        console.log('\n')
    }
}


/*
let inputs = readFile('./input.txt');
console.log(inputs);
*/

//main
var monkey0 = new Monkey([72, 97], ['*','13'], 19, 5, 6, 0);
var monkey1 = new Monkey([55, 70, 90, 74, 95], ['**','2'], 7, 5, 0, 1);
var monkey2 = new Monkey([74, 97, 66, 57], ['+','6'], 17, 1, 0, 2);
var monkey3 = new Monkey([86, 54, 53], ['+','2'], 13, 1, 2, 3);
var monkey4 = new Monkey([50, 65, 78, 50, 62, 99], ['+','3'], 11, 3, 7, 4);
var monkey5 = new Monkey([90], ['+','4'], 2, 4, 6, 5);
var monkey6 = new Monkey([88, 92, 63, 94, 96, 82, 53, 53], ['+','8'], 5, 4, 7, 6);
var monkey7 = new Monkey([70, 60, 71, 69, 77, 70, 98], ['*','7'], 3, 2, 3, 7);

var game = new Game([monkey0, monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7]);
for (let i=0; i<21; i++){
    game.turn();
}
console.log(246*236)
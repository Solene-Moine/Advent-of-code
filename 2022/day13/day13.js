const {readFileSync} = require('fs');

function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\n\s*\n/);
    for (let i=0; i<contents.length; i++){
        contents[i] = contents[i].split(/\r?\n/);
        contents[i][1] = contents[i][1].replace('\r', '')
    }
    return contents;
}

class Pair{
    constructor(arr1, arr2){
        this.arr1 = arr1;
        this.arr2 = arr2;

        this.singleElements = new Array();
        this.pushArray(arr1);
        this.size1 = this.singleElements.length;

        this.singleElements = [];
        this.pushArray(arr2);
        this.size2 = this.singleElements.length;

        this.size = Math.max(this.size1, this.size2)

        this.bool = true;

        
    }

    isRightOrder(obj1=this.arr1, obj2=this.arr2,indexStop=0){ //compare two objects
        console.log(obj1,obj2)
        if (!this.bool){ //the bool is false
            return false;
        }
        if (Number.isInteger(obj1) && Number.isInteger(obj2)){ //if both are integer
            if (obj1 > obj2){
                this.bool = false;
            }
        }
        else if (Array.isArray(obj1) && Array.isArray(obj2)){ //if both are arrays
            if (obj1.length > obj2.length){
                this.bool = false;
            }
            for (let i=0; i<obj1.length; i++){ //check each element of the array
                this.isRightOrder(obj1[i],obj2[i],indexStop+1);
            }
        }
        else if (Number.isInteger(obj1)){ //one of each
            obj1 = this.turnIntoArray(obj1);
            this.isRightOrder(obj1,obj2, indexStop+1);
        } else { //one of each
            obj2 = this.turnIntoArray(obj2);
            this.isRightOrder(obj1,obj2, indexStop+1);  
        }
    }


    compare(arr1 = this.arr1, arr2 = this.arr2, bool = true){
        if (arr1.length > arr2.length){
                return false;
        } else {
            for (let i=0; i<arr1.length; i++){
                compareObj(arr1[i], arr2[i])
            }
        }
        return bool;
    }

    turnIntoArray(int){
        return [int];
    }

    pushArray(arr){
        for(let i = 0; i < arr.length; i++){
            if(arr[i] instanceof Array){
                this.pushArray(arr[i]);
            } else {
                this.singleElements.push(arr[i]);
            }
        }
    }
}

/*
let inputs = readFile('./input2.txt');
for (arrays of inputs){
    arr1 = eval(arrays[0]);
    arr2 = eval(arrays[1]);
    let pair = new Pair(arr1, arr2);
    console.log(pair.isRightOrder())
}
*/

let pair = new Pair([1,[2,[3,[4,[5,6,7]]]],8,9] , [1,[2,[3,[4,[5,6,0]]]],8,9]);
console.log(pair.isRightOrder());
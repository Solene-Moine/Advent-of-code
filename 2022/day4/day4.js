const {readFileSync} = require('fs');

function syncReadFile(filename) {
  let contents = readFileSync(filename, 'utf-8');
  let arr = contents.split(/\r?\n/); //The question mark ? matches the preceding item (\r) 0 or 1 times.
  return arr;
}

function taskPaired(arr){ //split the task between the pair in array containing each task
    let arr2 = new Array();
    for (let i = 0; i < arr.length; i++){
        arr2[i] = [[],[]];
        arr[i] = arr[i].split(',');
        arr[i][0] = String(arr[i][0]).split('-');
        for (let j=Number(arr[i][0][0]); j <= Number(arr[i][0][1]); j++){
            arr2[i][0].push(j);
        }
        arr[i][1] = String(arr[i][1]).split('-');
        for (let j=Number(arr[i][1][0]); j <= Number(arr[i][1][1]); j++){
            arr2[i][1].push(j);
        }
    }
    return arr2;
}

function fullyOverlap(pair){ //check wether the tasks of the elves of the same pair fully overlap
    let overlap = false;
    if ((pair[0][0] <= pair[1][0] && pair[0][pair[0].length-1] >= pair[1][pair[1].length-1]) || (pair[1][0] <= pair[0][0] && pair[1][pair[1].length-1] >= pair[0][pair[0].length-1])){
        overlap = true;
    }
    return overlap
}

inputs = syncReadFile('./input.txt');
tasks = taskPaired(inputs);
let fullOverlapsTot = 0;
for (task of tasks){
    if (fullyOverlap(task) == true){
        fullOverlapsTot+=1;
    }
}
console.log(fullOverlapsTot);

//part 2

function overlap(pair){ //check wether the tasks of the elves of the same pair overlap
    let overlap = false;
    if (((pair[0][0] <= pair[1][0] && pair[0][pair[0].length-1] >= pair[1][pair[1].length-1]) || (pair[1][0] <= pair[0][0] && pair[1][pair[1].length-1] >= pair[0][pair[0].length-1])) || ((pair[0][0] <= pair[1][0] && pair[1][0] <= pair[0][pair[0].length-1]) || (pair[1][0] <= pair[0][0] && pair[0][0] <= pair[1][pair[1].length-1]))){
        overlap = true;
    }
    return overlap
}

let overlapsTot = 0;
for (task of tasks){
    if (overlap(task) == true){
        overlapsTot+=1;
    }
}
console.log(overlapsTot);
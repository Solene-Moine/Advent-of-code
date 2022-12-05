const {readFileSync} = require('fs');

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
  }

function syncReadFile(filename) {
  let contents = readFileSync(filename, 'utf-8');
  let arr = contents.split(/\n\s*\n/) //split on empty line

  //split instructions on line
  arr[1] = arr[1].split(/\r?\n/); //The question mark ? matches the preceding item (\r) 0 or 1 times.
  let instructions = arr[1]

  //split stack content in columns
  arr[0] = arr[0].split(/\r?\n/);
  for (let i=0; i < arr[0].length; i++){
    arr[0][i] = arr[0][i].split(' '); //that way every empty space is represented by 4 empty strings in the array
    for (let j=0; j < arr[0][i].length; j++){
        arr[0][i][j] = arr[0][i][j].replace('[','') //remove [ and ] from the arrays
        arr[0][i][j] = arr[0][i][j].replace(']','')
    }
    for (let j=0; j < arr[0][i].length; j++){ //get rid of ''
        if (arr[0][i][j] == ''){
            arr[0][i].splice(j+1,3);
        }
    }
  }
  arr[0].pop()
  let stacks = transpose(arr[0])


  for (let i=0; i < stacks.length; i++){
    while (stacks[i][0] == ''){
        stacks[i].shift();
    }
  }

  return [stacks,instructions];
}

function move(stacks, instruction){ //instruction is a string, stacks a matrix
    instruction = instruction.split(' ')
    for (let j=0; j < Number(instruction[1]); j++){
        let elementMoved = stacks[Number(instruction[3])-1].shift();
        stacks[Number(instruction[5])-1].unshift(elementMoved);
    }
    return stacks
}


[stacks, instructions] = syncReadFile('./input.txt');


for (let j=0; j < instructions.length; j++){
    move(stacks, instructions[j])
}

//console.log(move(stacks, instructions[0]))
console.log(stacks);

//part2
function move2(stacks, instruction){ //instruction is a string, stacks a matrix
    instruction = instruction.split(' ')
    tempArr = new Array()
    for (let j=0; j < Number(instruction[1]); j++){
        let elementMoved = stacks[Number(instruction[3])-1].shift();
        tempArr.unshift(elementMoved);
    }
    for (element of tempArr){
        stacks[Number(instruction[5])-1].unshift(element);
    }
    return stacks
}

[stacks2, instructions] = syncReadFile('./input.txt');


for (let j=0; j < instructions.length; j++){
    move2(stacks2, instructions[j])
}

//console.log(move(stacks, instructions[0]))
console.log(stacks2);
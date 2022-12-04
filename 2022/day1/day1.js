const {readFileSync} = require('fs');

function syncReadFile(filename) {
  let contents = readFileSync(filename, 'utf-8');
  let arr = contents.split(/\r?\n/); //The question mark ? matches the preceding item (\r) 0 or 1 times.
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Number(arr[i]); //the line between two elves will be represented by 0
  }
  return arr;
}


function caloriesPerIndividu(calsArr) {
//takes the array with all the calories and create an array of array with the calories split between each elf
  let indivCal = new Array();
  indivCal[0] = new Array();
  for (calory of calsArr) {
    if (calory != 0) {
      indivCal[indivCal.length-1].push(calory);
    } else {
      indivCal.push(new Array());
    }
  }
  return indivCal
}

function maxCal(arr){
  let max = 0;
  for (ind of arr){
    let sum = ind.reduce((partialSum, a) => partialSum + a, 0);
    if (sum>max){
      max = sum;
    }
  }
  return max;
}


inputs = syncReadFile('./input.txt');
indivCals = caloriesPerIndividu(inputs);
maxArr = maxCal(indivCals);
console.log(maxArr);

//part 2

function maxCalbis(arr){ //finds the max then make it empty so it won't be the next max
  let max = 0;
  let index = 0;
  let maxIndex = 0;
  for (ind of arr){
    let sum = ind.reduce((partialSum, a) => partialSum + a, 0);
    if (sum>max){
      max = sum;
      indexMax = index;
    }
    index += 1;
  }
  arr[indexMax] = [0];
  return max;
}

maxArr1 = maxCalbis(indivCals);
maxArr2 = maxCalbis(indivCals);
maxArr3 = maxCalbis(indivCals);
console.log(maxArr1+maxArr2+maxArr3);

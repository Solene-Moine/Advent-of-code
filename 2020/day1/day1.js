//import {readFileSync, promises as fsPromises} from 'fs';
const {readFileSync} = require('fs');

function syncReadFile(filename) {
  let contents = readFileSync(filename, 'utf-8');
  let arr = contents.split(/\r?\n/); //The question mark ? matches the preceding item (\r) 0 or 1 times.
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Number(arr[i]);
  }
  return arr;
}

function Dichotomy(arr, value) { //look for value in the array arr
    let leftIndex = 0;
    let rightIndex = arr.length - 1;
    while (leftIndex <= rightIndex) {
        let middleIndex = Math.floor((rightIndex + leftIndex)/2);
        if (arr[middleIndex] == value){
            return middleIndex;
        } else if (arr[middleIndex] > value) {
            rightIndex = middleIndex - 1;
        } else {
            leftIndex = middleIndex + 1;
        } 
    }
    return null;
}

function SumEqual(arr, value) { //find two elements in a sorted array whose sum is equal to value
    for (let i = 0; i < arr.length; i++) {
        complement = value - arr[i];
        indexComp = Dichotomy(arr, complement);
        if (indexComp != null) {
            return [arr[i], arr[indexComp]];
        }
      }
      return null;
}

inputs = syncReadFile('./input.txt');
const compareNumbers = (a, b) => a - b;
inputs.sort(compareNumbers); //sort alone works by comparing strings, not what we're interested in here

//part 1
results = SumEqual(inputs,2020)
console.log(results[0]*results[1]);

//part 2
for (let i = 0; i < inputs.length; i++) {
    let comp = SumEqual(inputs,2020 - inputs[i])
    if (comp != null) {
        results = ([inputs[i]].concat(comp));
        console.log(results[0]*results[1]*results[2]);
    }
}

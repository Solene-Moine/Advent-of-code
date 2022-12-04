const {readFileSync} = require('fs');

function syncReadFile(filename) {
  let contents = readFileSync(filename, 'utf-8');
  let arr = contents.split(/\r?\n/); //The question mark ? matches the preceding item (\r) 0 or 1 times.
  return arr;
}

function splitInHalf(arr){ //array of array spliting each rucksack in two
    for (let i = 0; i < arr.length; i++) { 
        arr[i] = [arr[i].slice(0, arr[i].length/2),arr[i].slice(arr[i].length/2)];
      }
      return arr;
}

function findItem(arr) { //find the item that appears in both compartment
    let sameItems = new Array();
    for (let i = 0; i < arr.length; i++) {
        let sameItem = null;
        rucksack = arr[i]
        for (item of rucksack[0]){ //we search through the first compartment
            if (rucksack[1].includes(item)){ // to find items also included in the second
                sameItem = item;
            }
        }
        sameItems.push(sameItem);
    }
    return sameItems;
}

function itemPriority(item){ //find the priority of a given item
    item = String(item)
    letters = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z')
    for (let i = 0; i < letters.length; i++){
        if (letters[i] == item) {
            return i+1
        }
    }
    return 0
}

inputs = syncReadFile('./input.txt');
inputs2 = splitInHalf(inputs);
items = findItem(inputs2);
let total = 0;
for (item of items) {
    total += itemPriority(item);
}

console.log(total);


//part2
function splitInThree(arr){ //array of array spliting the rucksacks in teams of three
    arr2 = new Array();
    for (let i = 0; i < arr.length; i+=3) { 
        arr2.push([arr[i],arr[i+1],arr[i+2]]);
      }
      return arr2;
}

function findItem2(arr) { //find the item that appears in three rucksacks
    let sameItems = new Array();
    for (let i = 0; i < arr.length; i++) {
        let sameItem = null;
        rucksack = arr[i]
        for (item of rucksack[0]){ //we search through the first rucksack
            if (rucksack[1].includes(item) && rucksack[2].includes(item)){ // to find items also included in the second and the third rucksack
                sameItem = item;
            }
        }
        sameItems.push(sameItem);
    }
    return sameItems;
}

inputs = syncReadFile('./input.txt');
inputs2 = splitInThree(inputs);
items = findItem2(inputs2);
let total2 = 0;
for (item of items) {
    total2 += itemPriority(item);
}

console.log(total2);




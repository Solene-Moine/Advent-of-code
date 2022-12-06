const {readFileSync} = require('fs');

function syncReadFile(filename) {
  return readFileSync(filename, 'utf-8');
}

function findUnique(str){
    let uniq = ""; // The variable that contains the unique values
    for(let i = 0; i < str.length; i++){ // Checking if the uniq contains the character
      if(uniq.includes(str[i]) === false){
        uniq += str[i] // If the character not present in uniq, Concatenate the character with uniq
      }
    }
    return uniq;
  }

function findCode(str){
    code = new Array();
    let i = 0;
    for (chara of str){
        if (findUnique(code).length == 4){
            return i
        }
        if (code.length == 4){
            code.shift(); //get rid of first character if the code is already 4 character long
        }
        code.push(chara);
        i+=1;
    }
    return code;
}


//main
inputs = syncReadFile('./input.txt');
console.log(findCode(inputs));

//for part 2 just replace 4 by 14
const {readFileSync} = require('fs');

function syncReadFile(filename) {
  let contents = readFileSync(filename, 'utf-8');
  let arr = contents.split(/\r?\n/); //The question mark ? matches the preceding item (\r) 0 or 1 times.
  for (let i = 0; i < arr.length; i++) { //array of array containing what will be played and what to play
    arr[i] = arr[i].split(" ");
  }
  return arr;
}

function points(arr) {
    let score = 0;
    for (let i = 0; i < arr.length-1; i++) { //the last line is empty
        if (arr[i][1] == 'X') { //if we play rock...
            score += 1; //we get one point
            if (arr[i][0] == 'A') { //if our oponent plays rock...
              score += 3; // it's a draw
            }
            else if (arr[i][0] == 'B') { //if our oponent plays paper...
              score += 0; // we lose
            }
            else { //if our oponent plays scissors...
              score += 6; // we win
            }
        }
        else if (arr[i][1] == 'Y') { //if we play paper...
          score += 2; //we get two point
          if (arr[i][0] == 'A') { //if our oponent plays rock...
            score += 6; // we win
          }
          else if (arr[i][0] == 'B') { //if our oponent plays paper...
            score += 3; // draw
          }
          else { //if our oponent plays scissors...
            score += 0; // we lose
          }
        }
        else { //if we play scissors...
          score += 3; //we get three point
          if (arr[i][0] == 'A') { //if our oponent plays rock...
            score += 0; // we lose
          }
          else if (arr[i][0] == 'B') { //if our oponent plays paper...
            score += 6; // we win
          }
          else { //if our oponent plays scissors...
            score += 3; // draw
          }
      }
    }
    return score;
}

inputs = syncReadFile('./input.txt');
total = points(inputs);
console.log(total);

//part2

function points2(arr) {
  let score = 0;
  for (let i = 0; i < arr.length-1; i++) {
      if (arr[i][1] == 'X') { //if we lose...
          score += 0; //we get no point
          if (arr[i][0] == 'A') { //if our oponent plays rock...
            score += 3; // we play scissors
          }
          else if (arr[i][0] == 'B') { //if our oponent plays paper...
            score += 1; // we play rock
          }
          else { //if our oponent plays scissors...
            score += 2; // we play paper
          }
      }
      else if (arr[i][1] == 'Y') { //if we end in a draw...
        score += 3; //we get three point
        if (arr[i][0] == 'A') { //if our oponent plays rock...
          score += 1; // we play rock
        }
        else if (arr[i][0] == 'B') { //if our oponent plays paper...
          score += 2; // we play paper
        }
        else { //if our oponent plays scissors...
          score += 3; // we play scissors
        }
      }
      else { //if we win...
        score += 6; //we get six point
        if (arr[i][0] == 'A') { //if our oponent plays rock...
          score += 2; // we play paper
        }
        else if (arr[i][0] == 'B') { //if our oponent plays paper...
          score += 3; // we play scissors
        }
        else { //if our oponent plays scissors...
          score += 1; // we play rock
        }
    }
  }
  return score;
}

total = points2(inputs);
console.log(total);
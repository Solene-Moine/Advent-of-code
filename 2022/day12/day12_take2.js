const {readFileSync} = require('fs');

function readFile(filename) {
    let contents = readFileSync(filename, 'utf-8'); 
    contents = contents.split(/\r?\n/);
    contents.pop();
    for (let i=0; i<contents.length; i++){
        contents[i] = contents[i].split('');
    }
    return contents;
}

function getNextChar(char) {
    return String.fromCharCode(char.charCodeAt(0) + 1);
}

class Graph {

    constructor(nodesNumber){ // defining nodes array and adjacent Dictionnary
        this.nodesNumber = nodesNumber;
        this.adjDic = new Map(); //the key of a map holds a node and values hold an array of an adjacent node
    }
 
    addNode(v){ // add nodes to the graph
        this.adjDic.set(v, []); // initialize the adjacent Dictionnary of the new node with a null array
    }

    addLine(v, w){ // add line between v and w to the graph
        this.adjDic.get(v).push(w); // get the dictionnary for node v and put the node w in adjacent nodes, but not the other way around because our graph is directed
    }

    printGraph(){ // Prints the adjacency dictionnary for each node
        let get_keys = this.adjDic.keys(); // get all the nodes
    
        for (let i of get_keys) {
    
            // get the corresponding adjacency dictionnary for the node
            let get_values = this.adjDic.get(i);
            let conc = "";
    
            // iterate over the adjacency dictionnary and concatenate the values into a string
            for (let j of get_values)
                conc += j + " ";
    
            // print the node and its adjacency dictionnary
            console.log(i + " -> " + conc);
        }
    }

    // function to performs BFS
    bfs(startingNode, destinationNode){

        let visited = {}; // create a visited object
        let arr = new Array(); // Create an array to put the nodes we're going to inspect in
    
        visited[startingNode] = true; // add the starting node to the array
        arr.push(startingNode);

        //add edges array and initialize it with startingNode
        let lines = [];
        lines[startingNode] = 0;

        while (!arr.length == 0) { // loop until array is empty
            let getArrElement = arr.shift(); // get the first element from the array (last to be put in)
            //console.log(getArrElement); // passing the current node to callback function
            if (getArrElement == destinationNode){
                return lines[destinationNode]; // just so we leave the function once we find what we want
            }
            let get_List = this.adjDic.get(getArrElement); // get the adjacent list for current node
    
            // loop through the list and add the element to the array if it is not processed yet
            for (let i in get_List) {
                let neighbor = get_List[i];
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    arr.push(neighbor);
                    lines[get_List[i]] = lines[getArrElement] + 1;
                }
            }
        }
    }
}

//main

inputs = readFile('./input.txt');
let graph = new Graph(inputs.length * inputs[0].length);
// we need to associate each spot on the map to a single key and its height, line and column (value)
map = new Map();
let key = 0;
startKeys = []; //for part2
for (let line=0; line<inputs.length; line++){
    for (let column=0; column<inputs[0].length; column++){
        map.set(key, []);
        if (inputs[line][column] == 'S'){
            startKeys.push(key); // for part 2, in part 1 it was "startKey = key;"
            map.get(key).push('a', line, column);
        }
        else if (inputs[line][column] == 'E'){
            endKey = key;
            map.get(key).push('z', line, column);
        }
        else if(inputs[line][column] == 'a'){ //for part 2
            startKeys.push(key); // for part 2
            map.get(key).push(inputs[line][column], line, column); // for part 2
        } else {
            map.get(key).push(inputs[line][column], line, column);
        }
        key+=1;
    } 
}



// adding nodes
let nodes = Array.from(map.keys());
for (let i = 0; i < nodes.length; i++) {
    graph.addNode(nodes[i]);
}

// adding lines between nodes
for (let [key1, value1] of map){
    for (let [key2, value2] of map){
        if (value1[1] == value2[1] && Math.abs(value1[2] - value2[2]) == 1 && value2[0] <= getNextChar(value1[0])){ //spots next to each other on the same line
            graph.addLine(key1, key2);
        }
        else if (value1[2] == value2[2] && Math.abs(value1[1] - value2[1]) == 1 && value2[0] <= getNextChar(value1[0])){ //spots next to each other on the same column
            graph.addLine(key1, key2);
        }
    }
}

//for part 2
let distance = Infinity;
for (key of startKeys){
    if (graph.bfs(key,endKey) < distance){
        distance = graph.bfs(key,endKey);
    }
}
console.log(distance);

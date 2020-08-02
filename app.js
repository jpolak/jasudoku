/*
This file is part of Jasudoku.

    Jasudoku is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Jasudoku is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Jasudoku.  If not, see <https://www.gnu.org/licenses/>.
*/

var APP = {};

APP.test_cases = {
    "Tubular" : [
        [0,6,0,0,7,0,0,0,0],
        [8,0,0,1,5,6,0,0,0],
        [0,0,0,0,0,8,0,4,1],
        [0,0,4,0,0,0,0,3,9],
        [0,0,0,3,0,0,7,2,0],
        [0,0,3,0,0,0,0,1,4],
        [0,0,0,0,0,1,0,9,5],
        [2,0,0,8,9,5,0,0,0],
        [0,9,0,0,3,0,0,0,0]
    ],
    "Swamphen" : [
        [0,8,0,0,0,0,0,3,9],
        [0,0,6,0,0,7,0,4,8],
        [0,0,0,0,3,0,0,0,0],
        [8,0,0,0,1,0,0,0,7],
        [0,6,2,0,0,8,9,0,0],
        [1,0,0,0,5,0,0,0,2],
        [0,0,0,0,7,0,0,0,0],
        [0,0,5,0,0,4,0,7,3],
        [0,9,0,0,0,0,0,1,6]
    ],
    "Honeyeater" : [
        [8,5,0,0,9,0,0,4,6],
        [0,0,2,0,4,0,7,0,0],
        [1,0,0,0,0,0,0,0,5],
        [0,0,0,0,6,0,0,0,0],
        [0,2,0,4,0,1,0,3,0],
        [3,0,0,0,0,0,0,0,7],
        [9,0,0,0,0,0,0,0,2],
        [0,7,0,0,0,0,0,8,0],
        [0,0,4,6,0,5,3,0,0] 
    ],
    "Fairywren" : [
        [0,7,0,3,0,4,0,9,0],
        [0,1,0,0,6,0,0,3,0],
        [0,0,4,0,2,0,1,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,8,0,4,0,6,0,0],
        [9,6,1,0,0,0,5,4,2],
        [0,0,0,5,0,6,0,0,0],
        [1,0,6,0,8,0,7,0,9],
        [7,0,0,0,0,0,0,0,8]
    ]
};

function load_testcase(){
    if (!document.getElementById("mode_load").checked){
        APP.elt_statusbar.value = "Please check the load option to load a test case. This cannot be done in the current mode.";
    }
    else{
        //Load the testcase
        testselect = document.getElementById("testcases");
        testcase = APP.test_cases[testselect.value];
        var i,j;
        for (i = 1; i <= 9; i++){
            for (j = 1; j <= 9; j++){
                to_ins = testcase[i-1][j-1];
                set_mvalue(i, j, to_ins, APP.numbers);
                set_mvalue(i, j, to_ins, APP.current_state);
            }
        }
        update_current_grid();
    }
}

//Only works on primitive numeric arrays
function array_equals(a,b){
    s1 = a.sort().toString();
    s2 = b.sort().toString();
    return(s1 == s2)
}

function no_duplicates(myArray) {
    result = myArray.length === new Set(myArray).size;
    return(result);
}

//check if "a" is a subset of "b"
function array_subset(a,b){
    result = a.every( function(val){
        return(b.indexOf(val) >= 0);
    });
    return(result);
}

APP.small_squares = [
    [1,2,3],[4,5,6],[7,8,9]
]

APP.numbers = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

APP.current_state = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]



function next_empty(twodarray){
    var i,j;
    for (i=0; i < 9; i++){
        for (j = 0; j < 9; j++){
            if (twodarray[i][j] == 0){
                return([i+1,j+1]);
            }
        }
    }
    return(false);
}

function values_in_square(r,c, twodarray){
    result = []
    corner_r = 3*Math.floor((r-1)/3);
    corner_c = 3*Math.floor((c-1)/3);
    var i,j;
    for (i = 0; i < 3; i++){
        for (j = 0; j < 3; j++){
            poss = twodarray[corner_r + i][corner_c + j];
            if (poss != 0){
                result.push(poss);
            }
        }
    }
    return(result);
}

function possible_inserts(r,c, twodarray){
    used = []
    var i,j;
    for (i=0; i < 9; i++){
        if (!(twodarray[r-1,i] == 0)){
            used.push(twodarray[r-1][i]);
        }
        if (!(twodarray[i,c-1] == 0)){
            used.push(twodarray[i][c-1]);
        }
    }
    used = used.concat(values_in_square(r, c, twodarray))
    result = []
    for (j = 1; j <= 9; j++){
        if (!used.includes(j)){
            result.push(j);
        }
    }
    return(result);
}

APP.valid_strings = [
    "1","2","3","4","5","6","7","8","9",""
]

//Return a text string that is the ID of the html element representing
//the grid at row "r" and column "c"
function get_ids(r, c){
    result = r+"."+c;
    return(result);
}


function get_mvalue(r, c, twodarray){
    result = twodarray[r-1][c-1];
    return(result);
}

function set_mvalue(r, c, val, twodarray){
    twodarray[r-1][c-1] = val;
}

//Solves the grid stored in APP.numbers
//Usually, that matrix will be filled out from the user input
//The moves will be stored in an array like this:
// [ [r,c, [possible], choice], ... ]
function solve_grid(){
    var count = 0;  //number of moves taken to solve the puzzle
    var moves = []
    APP.current_state = APP.numbers.slice()
    next_try = next_empty(APP.current_state)
    console.log(next_try);
    while(next_try && count < 15000){
        console.log("Step: "+count)
        count = count + 1;
        curr_r = next_try[0];
        curr_c = next_try[1];
        possible = possible_inserts(curr_r, curr_c, APP.current_state);
        if (possible.length == 0 && moves.length == 0){
            //there is a next blank cell, but there is no next move
            //AND there are no previous alternatives to try :(
            console.log("There are no more moves. Not solvable.")
            return(false);
        }
        else if (possible.length == 0 && moves.length > 0){
            next_move = moves[moves.length - 1];
            while (next_move[2].length == 0){
                console.log("Backtracking...");
                erase_r = next_move[0];
                erase_c = next_move[1];
                set_mvalue(erase_r, erase_c, 0, APP.current_state);
                moves.pop();
                next_move = moves[moves.length - 1];
            }
            hopeful_try = next_move[2].pop();
            old = next_move[3];
            next_move[3] = hopeful_try;
            change_r = next_move[0];
            change_c = next_move[1];
            set_mvalue(change_r, change_c, hopeful_try, APP.current_state);
            console.log("Move at "+change_r+","+change_c+"of "+ old +" is no good but we replace it with "+hopeful_try);
        }
        else{
            num_to_try = possible.pop();
            next_move = [curr_r, curr_c, possible, num_to_try];
            moves.push(next_move);
            set_mvalue(curr_r, curr_c, num_to_try, APP.current_state);
            console.log("There is are new possibilities at "+curr_r+", "+curr_c+" so we will put "+num_to_try+" there.");
        }
        update_current_grid();
        next_try = next_empty(APP.current_state);
    }
    APP.elt_statusbar.value = "Solved in "+count+" moves."
}

/*
===================
Section of program that handles user input and validation, and passes
the puzzle off to the solver above.
===================
*/

function update_current_grid(){
    var i,j;
    for (i = 0; i < 9; i++){
        for (j = 0; j < 9; j++){
            celt = document.getElementById(get_ids(i+1,j+1));
            toaddposs = APP.current_state[i][j];
            if (toaddposs != 0){
                celt.value = toaddposs;
            }
            else{
                celt.value = "";///////
            }
        }
    }
}

function load_document_elements(){
    APP.elt_statusbar = document.getElementById("statusbar");
    APP.elt_testcases = document.getElementById("testcases")
    for (const key in APP.test_cases){
        APP.elt_testcases.options[APP.elt_testcases.options.length] = new Option(key, key);
    }
}

function get_id_value(r, c){
    temp = document.getElementById(get_ids(r,c));
    return(temp.value)
}

function attempt_solution(){
    if (!document.getElementById("mode_solve").checked){
        APP.elt_statusbar.value = "You must first select solve mode before using the solve function!";
    }
    else{
        //Set up the puzzle for solving
        var i,j;
        for (i = 1; i <= 9; i++){
            for (j = 1; j <= 9; j++){
                to_ins = get_id_value(i,j);
                if (!(to_ins == "")){
                    to_ins = parseInt(to_ins);
                    set_mvalue(i, j, to_ins, APP.numbers);
                }
            }
        }
        //actually solve it:
        solve_grid();
    }
}

//Just check if the cells contain either the
//empty string or numbers 1-9
function check_valid_input(){
    var i,j;
    valid = true;
    for (i = 1; i <= 9; i++){
        for (j = 1; j <= 9; j++){
            curr = get_id_value(i,j);
            valid = valid && APP.valid_strings.includes(curr);
        }
    }
    return(valid);
}

//Make sure every row, column, and 3x3
//square contains no duplicates
function check_correct_form(){
    var i,j;
    var correct = ["1","2","3","4","5","6","7","8","9"];
    var correct_form = true;
    for (i = 1; i <= 9; i++){
        temp1 = []
        temp2 = []
        for (j = 1; j <= 9; j++){
            p1 = get_id_value(i,j);
            if (!p1 == ""){
                temp1.push(p1);
            }
            p2 = get_id_value(j,i);
            if (!p2 == ""){
                temp2.push(p2);
            }
        }
        correct_form = correct_form && array_subset(temp1, correct) && no_duplicates(temp1);
        correct_form = correct_form && array_subset(temp2, correct) && no_duplicates(temp2);
    }
    var m,n;
    for (i = 0; i < 3; i++){
        for (j = 0; j < 3; j++){
            temp3 = []
            arx = APP.small_squares[i];
            ary = APP.small_squares[j];
            for (m = 0; m < 3; m++){
                for (n = 0; n < 3; n++){
                    p3 = get_id_value(arx[m],ary[n])
                    if (!p3 == ""){
                        temp3.push(p3);
                    }
                }
            }
            correct_form = correct_form && array_subset(temp3, correct) && no_duplicates(temp3);
            console.log(correct_form);
        }
    }
    return(correct_form);
}

function check_solve_ready(){
    var ready = check_valid_input() && check_correct_form();
    if (!ready){
        document.getElementById("mode_edit").checked = true;
        APP.elt_statusbar.value = "The initial input is not valid. Game returned to edit mode.";
    }
}

function reset(){
    APP.numbers = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]
    APP.current_state = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]
    update_current_grid();
    document.getElementById("mode_edit").checked = true;
    APP.elt_statusbar.value = "Solver reset."
}


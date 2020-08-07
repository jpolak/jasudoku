
# This file is part of Jasudoku.

#     Jasudoku is free software: you can redistribute it and/or modify
#     it under the terms of the GNU General Public License as published by
#     the Free Software Foundation, either version 3 of the License, or
#     (at your option) any later version.

#     Jasudoku is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU General Public License for more details.

#     You should have received a copy of the GNU General Public License
#     along with Jasudoku.  If not, see <https://www.gnu.org/licenses/>.

import math

def values_in_square(r,c, grid):
    result = []
    corner_r = 3*math.floor((r-1)/3)
    corner_c = 3*math.floor((c-1)/3)
    for i in range(0,3):
        for j in range(0,3):
            poss = grid[corner_r + i][corner_c + j]
            if poss != 0:
                result.append(poss)
    return(result)

def possible_inserts(r, c, grid):
    used = []
    for i in range(0,9):
        if grid[r-1][i] != 0:
            used.append(grid[r-1][i])
        if grid[i][c-1] != 0:
            used.append(grid[i][c-1])
    used = used + values_in_square(r, c, grid)
    result = []
    for j in range(1,10):
        if not j in used:
            result.append(j)
    return(result)

def next_empty(grid):
    m,n = 0,0
    min = 10
    for i in range(0,9):
        for j in range(0,9):
            if grid[i][j] == 0:
                poss = possible_inserts(i+1, j+1, grid)
                if len(poss) < min:
                    min = len(poss)
                    m = i
                    n = j
    if min == 10:
        return(False)
    else:
        return((m+1,n+1))


def solve_grid(grid):
    count = 0
    moves = []
    current_state = grid.copy()
    next_try = next_empty(current_state)
    while next_try:
        count += 1
        curr_r = next_try[0]
        curr_c = next_try[1]
        possible = possible_inserts(curr_r, curr_c, current_state)
        if len(possible) == 0 and len(moves) == 0:
            return(False)
        elif len(possible) == 0 and len(moves) > 0:
            next_move = moves[-1]
            while len(next_move[2]) == 0:
                erase_r = next_move[0]
                erase_c = next_move[1]
                current_state[erase_r - 1][erase_c - 1] = 0
                moves.pop()
                next_move = moves[-1]
            hopeful_try = next_move[2].pop()
            old = next_move[3]
            next_move[3] = hopeful_try
            change_r = next_move[0]
            change_c = next_move[1]
            current_state[change_r-1][change_c-1] = hopeful_try
        else:
            num_to_try = possible.pop()
            next_move = [curr_r, curr_c, possible, num_to_try]
            moves.append(next_move)
            current_state[curr_r-1][curr_c-1] = num_to_try
        next_try = next_empty(current_state)
    print(f"Solved in {count} moves.")
    print(current_state)

grid = [
		[0,0,2,8,0,0,0,0,0],
		[0,3,0,0,6,0,0,0,7],
		[1,0,0,0,0,0,0,4,0],
		[6,0,0,0,9,0,0,0,0],
		[0,5,0,6,0,0,0,0,9],
		[0,0,0,0,5,7,0,6,0],
		[0,0,0,3,0,0,1,0,0],
		[0,7,0,0,0,6,0,0,8],
		[4,0,0,0,0,0,0,2,0]
    ]

solve_grid(grid)
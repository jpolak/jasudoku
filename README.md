# Jasudoku

Try it here: https://jpolak.org/games/jasudoku/ (this may not be the most up to date version, but it is at least at V2)

## Introduction

This is a Sudoku solver written in Javascript. It is written in pure Javascript, which means it doesn't use any kind of newfangled Javascript library. The name of the program is a portmanteau of Jason and Sudoku. It is written from scratch, without reference to any existing code. Therefore, it may be limited in some ways. Future versions will eliminate these problems and create the most complete sudoku solver in the world.

## Usage

The entire program is made up of three files: app.js, main.css, and index.html. As long as these files are in the same folder, the program will work. Open main.html in a modern browser and the rest should be self-explanatory.

## Limitations

So far, it limits the total moves to 15000. A few sudoku puzzles take longer than 15000 moves to complete. However, this limitation is in place so the script doesn't overheat my computer. There may also be bugs.

**Update 2020-08-01**: Version 2 of Jasudoku is much faster. Instead of proceeding upper-left corner by rows to the lower-right corner, it now proceeds by choosing the squares with the least number of possibilities first. That way, the move tree gets exhausted far more rapidly. What used to take thousands of moves now only takes hundreds. In fact, I doubt there exists a Sudoku that takes more than 500 moves.

**Edit**: So, I was wrong. Finnish mathematician Arto Inkala actually constructed a very hard Sudoku, which I imported as a test case "Inkala" into the program. It is still solved by Jasudoku, but in 8894 moves!

**Edit #2**: So there are definitely still Sudokus that this solver cannot solve in 15000 moves. Increasing the move count just overheats my computer so I would have to port this to C to see how long it really takes. Or Python, which would still be faster than Javascript in the browser probably. 

## Future directions

Optimizations will be put in place to reduce the number of moves required, and the styling will be improved.

## License

GPLv3

# Grambulate.js 
This package lets you grambulate so you can solve important math problems like uhhhhhhhhhhhhhhhh...

## Installation
To install this using npm, use:
```
npm i github:kapios010/grambulate.js
```

## Functions
### `grambulatePos(numA:number, numB:number, deg?:number) : number`
This lets you grambulate on a positive spiral
```
5 4 3
6 1 2
7 8 9 ...
```
`numA, numB` are integers you operate on

`deg` is the degree of operation, the integer you start the board on, defaults to `1`

(example of a board with `deg` set to `-1`)
```
3 2 1
4 -1 0
5 6 7 ...
```

If `numA` or `numB` are lower than the degree, the function throws an error.

The function returns a number - the result of the operation.

### `grambulateNeg(numA:number, numB:number, deg?:number) : number`
Will do operations on a negative spiral
```
-5 -4 -3
-6 -1 -2
-7 -8 -9 ...
```

`numA, numB` are integers you operate on

`deg` is the degree of operation, the integer you start the board on, defaults to `-1`

Otherwise, stays the same as grambulatePos

### `calculatePosLevel(num:number, deg?:number) : number`
Returns the "level" of the number in the spiral. 
Equation provided courtesy of [@DDMPlayer](https://github.com/DDMPlayer).

`num` is the integer you operate on

`deg` is the degree of operation, the integer you start the board on, defaults to `-1`

```
5 4 3       1 1 1   
6 1 2       1 0 1
7 8 9 ...   1 1 1 ...
```
Onions have layers.

### `calculateNegLevel(num:number, deg?:number) : number`
Returns the "level" of the number in the spiral.
Equation provided courtesy of [@DDMPlayer](https://github.com/DDMPlayer) and modified by [@kapios010](https://github.com/kapios010) to hopefully work well on negative numbers.

`num` is the integer you operate on

`deg` is the degree of operation, the integer you start the board on, defaults to `-1`

```
-5 -4 -3       1 1 1   
-6 -1 -2       1 0 1
-7 -8 -9 ...   1 1 1 ...
```
Onions have layers.

## Errors
### `Incorrect function input(s).`
Is thrown when a function input prevents the function from being calculated.
Examples:
* In `grambulatePos`, either `numA` or `numB` are smaller than `deg`
* In `calculateNegLevel`, `num` is larger than `deg`

### `Exceeded memory usage threshold. (95%)`
Is thrown when the program uses more memory than the threshold, which is set to 95%, allows. That can happen when using large numbers. This approach prevents program crashes and memory leaks.

## Thank you
Thanks for using the library, even if it just stems from a joke! ❤️

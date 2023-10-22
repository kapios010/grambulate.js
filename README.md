# Grambulate.js
#### ⚠️ Warning: This has caused a Heap Limit Allocation Fail on my machine multiple times with large values 
This package lets you grambulate so you can solve important math problems like uhhhhhhhhhhhhhhhh...

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

### `grambulateNeg(numA:number, numB:number, deg?:number)`
Will do operations on a negative spiral
```
-5 -4 -3
-6 -1 -2
-7 -8 -9
```

`numA, numB` are integers you operate on
`deg` is the degree of operation, the integer you start the board on, defaults to `-1`

Otherwise, stays the same as grambulatePos

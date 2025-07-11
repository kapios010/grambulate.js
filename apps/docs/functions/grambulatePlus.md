# grambulatePlus & grambulateMinus

## Explanation

These function grambulate 2 numbers on a positive or negative board and return the result as a `number`.
Numbers on a **positive** board go up in value.

```
5 4 3
6 1 2
7 8 9...
```

In this case, `grambulatePlus(8, 1)` would return `4`.

Numbers on a **negative** board go down in value.

```
-5 -4 -3
-6 -1 -2
-7 -8 -9...
```

In this case, `grambulateMinus(-9, -1)` would return `-5`.

The **degree** is the starting number of the spiral, by default `1` on a positive board and `-1` on a negative board. A degree can be any integer.
On a positive board, inputs can't be lower than the degree. On a negative board - they can't be higher.

## `grambulatePlus(inputA: number, inputB: number, degree?: number): number`

Grambulates on a positive board.
Inputs:

- `inputA` and `inputB` - the numbers to be grambulated
- `degree` - the degree of the operation, by default `1`
  Output:
  The result of the operation

## `grambulateMinus(inputA: number, inputB: number, degree?: number): number`

Grambulates on a negative board.
Inputs:

- `inputA` and `inputB` - the numbers to be grambulated
- `degree` - the degree of the operation, by default `-1`
Output:
  The result of the operation

# grambulate.js

This package lets you grambulate, so you can solve important problems such as (missing footage) and (photo not found)!

Made according to [this solution by u/DragonballQ](https://www.reddit.com/r/mathmemes/comments/tvn2gj/the_solution_to_the_april_fools_math/), but also with expanded features!

Now updated to version 4!

## Installation

To install this, type the following into your command line depending on your package manager:
```cmd
npm i grambulate.js
yarn add grambulate.js
pnpm add grambulate.js
bun add grambulate.js
```
...or, you know, just, use the button in the sidebar if you want npm

## What's grambulation?

As seen in the Reddit link above, you put numbers in a spiral.
After that to grambulate the numbers (A, B) you:
- Calculate the vector AB
- Copy that vector with B as the starting point
- The ending of that vector will be point C
- The number on that spot will be the result

```
...16 15 14 13
   5  4  3  12
   6  1  2  11
   7  8  9  10

1 ◊ 3 = 13
6 ◊ 1 = 2
```

### But also, there's stuff not found anywhere else!

- Negative grambulation, that's when the values of the numbers on the board go down instead of up:
```
-5 -4 -3
-6 -1 -2
-7 -8 -9...

-1 ⧫ -3 = 13
-7 ⧫ -1 = -3
```
- Degrees of operations, that's when you want the board to start a different number, so for example:
```
3  2 1
4 -1 0
5  6 7 ...

7 ◊₋₁ 0 = 1
5 ◊₋₁ -1 = 1
```

## Getting Started

1. Install grambulate.js using the commands in the Installation section
2. To grambulate 2 numbers together use either `grambulatePlus()` for the positive board or `grambulateMinus()` for the negative board:
```js
import { grambulatePlus, grambulateMinus } from 'grambulate.js';

grambulatePlus(1, 3) // returns 13
grambulateMinus(-1, -3) // returns -13

console.log(grambulatePlus(1, 5))
```
3. To use degrees, add a third argument to either of the functions:
```js
grambulatePlus(7, 0, -1) // returns 1
```



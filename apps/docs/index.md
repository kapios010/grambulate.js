# grambulate.js

## About

grambulate.js is a [Node.js](https://nodejs.org/en) module that allows you to perform the mathematical operation of grambulation, according to [this explanation by u/DragonballQ](https://www.reddit.com/r/mathmemes/comments/tvn2gj/the_solution_to_the_april_fools_math/).

## Installation

To install the package from npm, use one of the following commands depending on the package manager you're using.

```bash
npm install grambulate.js
yarn add grambulate.js
pnpm add grambulate.js
bun add grambulate.js
```

## Example usage

{: .note }
These examples use [ES Modules](https://nodejs.org/api/esm.html#enabling) syntax

1. Install grambulate.js using one of the installation commands above
2. Import the grambulation functions from the package:
```js
import { grambulatePlus, grambulateMinus } from 'grambulate.js'
```
3. Use the functions to grambulate numbers:
```js
console.log(grambulatePlus(1, 3))
console.log(grambulateMinus(-1, -3))
```

## Is there more?

The package contains other functions that help perform the main grambulation operation. These are not necessary for standard use of the package, but if you'd like to go more in-depth, they're documented here!

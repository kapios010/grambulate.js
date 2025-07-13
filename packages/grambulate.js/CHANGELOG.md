# grambulate.js

## 4.1.0

### Minor Changes

- 89b5041: Remove lodash dependency

## 4.0.0

### Major Changes

- Remove Grambulator class and spiral limit. Move grambulation functions to direct export.
  - Before:

  ```js
  import { Grambulator } from "grambulate.js";

  let g = new Grambulator();

  g.grambulatePlus(1, 3);
  ```

  - After:

  ```js
  import { grambulatePlus } from "grambulate.js";

  grambulatePlus(1, 3);
  ```

## 3.1.0

### Minor Changes

- Make grambulation more efficient, make negative grambulation depend on positive grambulation
- f0e0546: Update link to repo and homepage

### Patch Changes

- 2a6768f: Remake of the package

# DateNP

Lightweight JavaScript library to convert Nepali and English dates.

[![](https://data.jsdelivr.com/v1/package/npm/datenp/badge?style=rounded)](https://www.jsdelivr.com/package/npm/datenp) [![](https://img.shields.io/npm/dt/datenp.svg)](https://img.shields.io)

# Features

- Lightweight
- Zero dependencies
- Supports date conversion from `1975` BS to `2100` BS
- Easy to use
- Beginner friendly

# Installation

## Node

```sh
$ npm install datenp
```

## Deno

```ts
import DateNP from "https://deno.land/x/datenp/mod.ts";
```

## Browsers

```html
<script type="module">
import DateNP from "https://cdn.jsdelivr.net/npm/datenp@latest/dist/mod.mjs";
</script>
```

# Example

## CommonJS

```js
const { DateNP } = require("datenp");
```

## AD to BS
```js
import DateNP from "datenp"

const np = new DateNP(new Date("2022-01-06"));

console.log(np.toBS()); // { year: 2078, month: 9, day: 22 }
```

## BS to AD
```js
import DateNP from "datenp"

const np = new DateNP("2078-09-22");

console.log(np.toAD()); // { year: 2022, month: 1, day: 6 }
console.log(np.getMonthName()); // "Poush"
```

## Created and maintained by [DevAndromeda](https://github.com/DevAndromeda)
Under **MIT** License
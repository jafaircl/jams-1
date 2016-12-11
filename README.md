#Jams
## JavaScript AdWords Modules

## Introduction

Jams is a library of ES6 classes and helper functions for use in AdWords Scripts.

## Get Started

cd to your directory and clone the repo:

```sh
git clone https://github.com/jafaircl/jams.git
```

By default, rollup will look at src/index.js and output to jams.js. To change the input or output files, modify the entry/dest properties of rollup.config.js:

```javascript
export default {
  entry: "src/index.js", // change this for the input
  dest: "jams.min.js", /// change this for the output
  format: "es",
  plugins: [...],
};
```

To build in development (un-minified) use:

```sh
./node_modules/.bin/rollup -c --watch
```

To build in prodution (minified with uglify) use:

```sh
NODE_ENV=production ./node_modules/.bin/rollup -c --watch
```
# @kanthoney/props

`@kanthoney/props` iterates deeply through an object/array/set/map and returns a single promise resolving to a copy of the object with all the promises resolved,
or the first rejected promise.

## installation

`npm install --save @kanthoney/props`

## usage

```
const props = require('@kanthoney/props');

props({
  a: Promise.resolve('value1'),
  b: {
    b1: [ Promise.resolve('value2'), Promise.resolve('value3') ]
  },
  c: new Set([ Promise.resolve('value4') ]),
  d: new Map([[[ Promise.resolve('key1'), 'key2'], Promise.resolve('value5')]]),
  e: 'value6'
}).then(result => {
  console.log(result);
  // { a: 'value1', b: { b1: [ 'value2', 'value3' ] }, c: Set { 'value4' }, d: Map { [ 'key1', 'key2' ] => 'value5' }, e: 'value6' }
});

props({
  a: Promise.reject('value1'),
  b: {
    b1: [ Promise.resolve('value2'), Promise.resolve('value3') ]
  },
  c: new Set([ Promise.resolve('value4') ]),
  d: new Map([[[ Promise.resolve('key1'), 'key2'], Promise.resolve('value5')]]),
  e: 'value6'
}).catch(err => {
  console.error(err); // 'value1'
});
```


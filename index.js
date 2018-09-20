'use strict';

const _ = require('lodash');

function props(v)
{
  if(_.isArray(v)) {
    return Promise.all(_.map(v, v1 => {
      return props(v1);
    }));
  } else if(_.isPlainObject(v)) {
    let keys = _.keys(v);
    let values = _.map(keys, k => {
      return props(v[k]);
    });
    return Promise.all(values).then(values => {
      return _.zipObject(keys, values);
    });
  } else if(_.isMap(v)) {
    let values = [];
    for(let p of v) {
      values.push(Promise.all([props(p[0]), props(p[1])]));
    }
    return Promise.all(values).then(values => {
      return new Map(values);
    });
  } else if(_.isSet(v)) {
    let values = [];
    for(let v1 of v) {
      values.push(props(v1));
    }
    return Promise.all(values).then(values => {
      return new Set(values);
    });
  } else if(!_.isNil(v) && v.then) {
    return v.then(v => {
      return props(v);
    });
  } else {
    return Promise.resolve(v);
  }    
};

module.exports = props;


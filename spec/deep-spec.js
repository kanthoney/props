'use strict';

const props = require('../index');
const success = require('./success');
const failure = require('./failure');
const _ = require('lodash');

describe('Deep object tests', () => {

  it('should successfully resolve all values in complex object', done => {
    props({
      a: [ { b: success('value1') }, new Map([[ success('c'), success('value2')], ['d', 'value3']]) ],
      e: new Map([[success([success('f'), success('g')]), success({ h: success('value4') })], [new Set([success('i'), success('j')]), success('value5')]])
    }).then(a => {
      expect(_.isEqual(a, {
        a: [ {b: 'value1'}, new Map([['c', 'value2'], ['d', 'value3']]) ],
        e: new Map([[['f', 'g'], { h: 'value4' }], [new Set(['i', 'j']), 'value5']])
      })).toBeTruthy();
      done();
    }).catch(done);
  });

  it("should reject with message 'value4' on attempting to resolve all values in complex object", done => {
    props({
      a: [ { b: success('value1') }, new Map([[ success('c'), success('value2')], [failure('d', 100), 'value3']]) ],
      e: new Map([[success([success('f'), success('g')]), success({ h: failure('value4') })], [new Set([success('i'), success('j')]), success('value5')]])
    }).then(a => {
      done("Should throw exception");
    }).catch(err => {
      expect(err).toBe('value4');
      done();
    });
  });

  it("should reject with message 'i' on attempting to resolve all values in complex object", done => {
    props({
      a: [ { b: success('value1') }, new Map([[ success('c'), success('value2')], [failure('d', 100), 'value3']]) ],
      e: new Map([[success([success('f'), success('g')]), success({ h: success('value4') })], [new Set([failure('i'), success('j')]), failure('value5', 100)]])
    }).then(a => {
      done("Should throw exception");
    }).catch(err => {
      expect(err).toBe('i');
      done();
    });
  });

});


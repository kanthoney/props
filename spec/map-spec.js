'use strict';

const props = require('../index');
const success = require('./success');
const failure = require('./failure');
const _ = require('lodash');

describe("Map tests", () => {

  it('should resolve all keys and values of map', done => {
    return props(new Map([
      [success('key1'), success('value1')],
      ['key2', success('value2')],
      [success('key3'), 'value3'],
      ['key4', 'value4']
    ])).then(map => {
      expect(map).toEqual(new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3'],
        ['key4', 'value4']
      ]));
      done();
    }).catch(done);
  });
  
  it('should reject attempt to resolve all keys and values of map due to failed value', done => {
    return props(new Map([
      [success('key1'), success('value1')],
      ['key2', failure('value2')],
      [success('key3'), 'value3'],
      ['key4', 'value4']
    ])).then(map => {
      done("should have rejected attempt to resolve map");
    }).catch(err => {
      expect(err).toBe("value2");
      done();
    });
  });

  it('should reject attempt to resolve all keys and values of map due to failed key', done => {
    return props(new Map([
      [success('key1'), success('value1')],
      ['key2', success('value2')],
      [failure('key3'), 'value3'],
      ['key4', 'value4']
    ])).then(map => {
      done("should have rejected attempt to resolve map");
    }).catch(err => {
      expect(err).toBe("key3");
      done();
    });
  });

  it('should resolve empty map', done => {
    props(new Map()).then(result => {
      expect(_.isEqual(result, new Map())).toBeTruthy();
      done();
    }).catch(done);
  });

});


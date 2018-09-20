'use strict';

const props = require('../index');
const success = require('./success');
const failure = require('./failure');
const Obj = require('./obj');
const _ = require('lodash');

describe('Object tests', () => {

  it('should resolve all values of plain object', done => {
    props({
      a: success('value1'),
      b: success('value2'),
      c: 'value3'
    }).then(obj => {
      expect(obj).toEqual({ a: 'value1', b: 'value2', c: 'value3' });
      done();
    }).catch(done);
  });

  it('should resolve all values of object', done => {
    props(new Obj(true)).then(obj => {
      expect(obj).toEqual({ a: 'a' });
      done();
    }).catch(done);
  });

  it('should reject attempt to resolve plain object', done => {
    props({
      a: success('value1'),
      b: failure('value2'),
      c: 'value3'
    }).then(obj => {
      done('Should have rejected');
    }).catch(err => {
      expect(err).toBe('value2');
      done();
    });
  });
  
  it('should reject attempt to resolve all values of object', done => {
    props(new Obj(false)).then(obj => {
      expect(obj).toEqual({ a: 'a' });
      done("Expected to throw exception");
    }).catch(err => {
      expect(err).toBe('a');
      done();
    });
  });

  it('should resolve object with function as member', done => {
    props({
      a: _.constant('a')
    }).then(result => {
      expect(_.isFunction(result.a)).toBeTruthy();
      done();
    }).catch(done);
  });

});


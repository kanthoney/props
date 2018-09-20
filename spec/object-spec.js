'use strict';

const props = require('../index');
const success = require('./success');
const failure = require('./failure');

describe('Object tests', () => {

  it('should resolve all values of object', done => {
    props({
      a: success('value1'),
      b: success('value2'),
      c: 'value3'
    }).then(obj => {
      expect(obj).toEqual({ a: 'value1', b: 'value2', c: 'value3' });
      done();
    }).catch(done);
  });

  it('should reject attempt to resolve object', done => {
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
  
});


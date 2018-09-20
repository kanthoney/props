'use strict';

const props = require('../index');
const failure = require('./failure');
const success = require('./success');
const _ = require('lodash');

describe('Set tests', () => {

  it('should successfully resolve set of promises', done => {
    props(new Set([
      success('value1'),
      success('value2'),
      'value3'
    ])).then(result => {
      expect(_.isEqual(result, new Set(['value1', 'value2', 'value3']))).toBeTruthy();
      done();
    }).catch(done);
  });

  it('should reject when attempting to resolve set of promises', done => {
    props(new Set([
      success('value1'),
      failure('value2'),
      'value3'
    ])).then(result => {
      fail('Expected to throw exception');
      done();
    }).catch(err => {
      expect(err).toBe('value2');
      done();
    });
  });

  it('should resolve empty set', done => {
    props(new Set()).then(result => {
      expect(result).toEqual(new Set());
      done();
    }).catch(done);
  });

});


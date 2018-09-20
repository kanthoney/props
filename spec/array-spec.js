'use strict';

const props = require('../index');
const success = require('./success');
const failure = require('./failure');

describe('Array tests', () => {

  it('should resolve all the elements of an array', done => {
    props([success("value1"), success("value2"), "value3"]).then(a => {
      expect(a).toEqual(["value1", "value2", "value3"]);
      done();
    })
      .catch(done);
  });

  it('should reject attempt to resolve an array', done => {
    props([success("value1"), failure("value2"), "value3"]).then(a => {
      failure("Should not have resolved array");
      done();
    }).catch(err => {
      expect(err).toBe("value2");
      done();
    });
  });

  it('should resolve empty array', done => {
    props([]).then(result => {
      expect(result).toEqual([]);
      done();
    }).catch(done);
  });

});


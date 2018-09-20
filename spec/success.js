'use strict';

module.exports = function(value, delay)
{
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve(value);
      },
      delay || 10);
  });
};


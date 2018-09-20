'use strict';

module.exports = function(value, delay)
{
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        reject(value);
      },
      delay || 10);
  });
};


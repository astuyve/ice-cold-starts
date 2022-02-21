'use strict'

const { Blob } = require('node:buffer')

// Helper function to time out the invocation
const generateData = (size) => {
  return new Blob([new ArrayBuffer(size)], {type: 'application/octet-stream'});
}
// Set up the cache outside of the handler
let cacheVar = {start: 'is cold', hits: 1}

module.exports.iceColdStartError = async (event) => {
  const body = JSON.parse(event.body)

  let returnVal
  if (cacheVar.start === 'is cold') {
    // If we have a cold start, set the 'is warm' value
    returnVal = cacheVar
    cacheVar = {start: 'is warm', hits: 1}
  } else {
    // Otherwise, increase the cache hits
    cacheVar.hits += 1
  }
  console.log('cache: ', JSON.stringify(returnVal || cacheVar, null, 2))

  if (body && body.oom) {
    // Intentionally error the function out by allocating too much memory
    // if the 'oom' value is present in the request body
    const oom = generateData(134219999)
  }
  return {
    statusCode: 200,
    body: JSON.stringify(
      returnVal || cacheVar,
      null,
      2
    ),
  };
};

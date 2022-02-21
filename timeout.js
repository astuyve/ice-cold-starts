'use strict'

// Helper function to time out the invocation
const delay = async (time) => {
  return new Promise(res => setTimeout(res, time))
}

// Set up the cache outside of the handler
let cacheVar = {start: 'is cold', hits: 1}

module.exports.iceColdStartTimeout = async (event) => {
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
  console.log('cache:', JSON.stringify(returnVal || cacheVar, null, 2))

  if (body && body.timeout) {
    // Intentionally time the function out
    // if the 'timeout' value is present in the request body
    await delay(30000)
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

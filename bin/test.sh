#!/bin/bash

# Description: run tests normally, for local testing
# Param 1: the reporter to use, defaults to spec
run_tests()
{
  node_modules/.bin/mocha \
  --compilers js:babel-core/register \
  --reporter spec \
  --recursive --timeout 5000 \
  test/setup.js test/**/*.js
}

NODE_ENV=test run_tests


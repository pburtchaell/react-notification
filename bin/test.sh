#!/bin/bash

# Description: run tests normally, for local testing
# Param 1: the reporter to use, defaults to spec
runTests()
{
  node_modules/.bin/mocha \
  --compilers js:babel-core/register \
  --reporter ${1-spec} \
  --recursive --timeout 5000 \
  test/setup.js test/**/*.js
}

# Description: run tests with Istanbul coverage
runIstanbul()
{
  NODE_ENV=test `npm bin`/istanbul cover \
  node_modules/.bin/_mocha \
  -- -u exports --compilers js:babel-core/register \
  --report lcovonly \
  test/polyfills.js test/*.js
}

# If on Travis, run tests with Istanbul
# TODO: setup code coverage
#if [ -n "${TRAVIS_JOB_ID}" ]; then

  #echo -e "Travis CI job id set to ${TRAVIS_JOB_ID}. \nRunning tests with Istanbul..."
  #NODE_ENV=test runIstanbul

  #echo "Sending coverage information to Coveralls..."
  #cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js || true
  #rm -rf ./coverage

# Otherwise, when local, run tests normally without Istanbul
#else
  NODE_ENV=test runTests ${REPORTER}
#fi

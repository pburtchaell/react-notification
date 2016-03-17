BIN = `npm bin`
TESTS = test/setup.js test/**/*.js
REPORTER = spec

# Task: test
# Run mocha tests for components.
test:
	@NODE_ENV=test $(BIN)/mocha \
	  --compilers js:babel-core/register \
	  --reporter $(REPORTER) \
		--recursive \
		--timeout 5000 \
		$(TESTS)

.PHONY: test

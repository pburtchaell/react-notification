bin = ./node_modules/.bin

SRC_JS = $(shell find src -name "*.js")
DIST_JS = $(patsubst src/%.js, dist/%.js, $(SRC_JS))

$(DIST_JS): dist/%.js: src/%.js
	mkdir -p $(dir $@)
	$(bin)/babel $< -o $@

# Task: js
# Builds distribution JS files for publishing to npm.
js: $(DIST_JS)

# Task: test-all
# Runs all unit tests
test-all:
	NODE_ENV=test `npm bin`/mocha --compilers js:babel/register --recursive
	`npm bin`/eslint ./src/*.js
	`npm bin`/eslint ./test/*.js
	`npm bin`/eslint ./examples/es2015/*.js

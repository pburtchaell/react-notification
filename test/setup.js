import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

/**
 * Add commonly used functions in tests to global
 * so they do not need to be imported each time.
 */
global.React = require('react');
global.expect = require('chai').expect;
global.spy = require('sinon').spy;
global.shallow = require('enzyme').shallow;
global.mount = require('enzyme').mount;
global.jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

chai.use(chaiEnzyme());

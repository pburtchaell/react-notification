import jsdom, { JSDOM } from 'jsdom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

const exposedProperties = ['window', 'navigator', 'document'];

// Include stack on error
chai.config.includeStack = true;

/**
 * Add commonly used functions in tests to global
 * so they do not need to be imported each time.
 */
global.React = require('react');
global.expect = require('chai').expect;
global.spy = require('sinon').spy;
global.shallow = require('enzyme').shallow;
global.mount = require('enzyme').mount;

global.jsdom = jsdom;

const dom = new JSDOM();

global.document = dom.document;
global.window = dom.window;

Object.keys(dom.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = dom.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

chai.use(chaiEnzyme());

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

chai.use(chaiEnzyme());

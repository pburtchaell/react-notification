import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import { Notification, NotificationStack } from '../src/index';
import mockNotification from './mockNotification';

describe('Notification', () => {
  jsdom();

  const component = (
    <Notification
      message={mockNotification.message}
      action={mockNotification.action}
      style={mockNotification.style}
      onClick={mockNotification.onClick}
      dismissAfter={mockNotification.dismissAfter}
    />
  );

  it('should be a valid element', done => {
    if (TestUtils.isElement(component)) done();
  });

  it('should render correct message and action text', done => {
    const tree = TestUtils.renderIntoDocument(component);

    let { message, action } = tree.refs;

    expect(message.innerHTML).toBe(mockNotification.message);
    expect(action.innerHTML).toBe(mockNotification.action);

    done();
  });

  it('should accept custom bar styles', done => {
    const DOMNode = findDOMNode(TestUtils.renderIntoDocument(component))

    expect(DOMNode.style.getPropertyValue('background'))
      .toBe(mockNotification.style.bar.background);

    done();
  });

  it('should accept custom action styles', done => {
    const tree = TestUtils.renderIntoDocument(component);
    let { action } = tree.refs;

    expect(action.style.getPropertyValue('color'))
      .toBe(mockNotification.style.action.color);

    done();
  });

  it('should handle click events', done => {
    const tree = TestUtils.renderIntoDocument(component);

    let wrapper = TestUtils.findRenderedDOMComponentWithClass(tree, 'notification-bar-wrapper');

    TestUtils.Simulate.click(wrapper);

    done();
  });
});

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import { Notification, NotificationStack } from '../src/index';

const MOCK = {
  key: 1111111,
  message: 'Test',
  action: 'Dismiss',
  dismissAfter: 3000,
  onClick: function handleClick() {
    return;
  },
  style: {
    bar: {
      background: '#bababa'
    },
    action: {
      color: '#000'
    },
    active: {
      left: '2rem'
    }
  }
};

describe('Notification', () => {
  jsdom();

  it('should be a valid element', done => {
    const component = (
      <Notification
        message={MOCK.message}
        action={MOCK.action}
        onClick={MOCK.onClick}
        dismissAfter={MOCK.dismissAfter}
      />
    );

    if (TestUtils.isElement(component)) done();
  });

  it('should render correct message and action text', done => {
    const tree = TestUtils.renderIntoDocument(
      <Notification
        message={MOCK.message}
        action={MOCK.action}
        onClick={MOCK.onClick}
        dismissAfter={MOCK.dismissAfter}
      />
    );

    let { message, action } = tree.refs;

    expect(message.innerHTML).toBe(MOCK.message);
    expect(action.innerHTML).toBe(MOCK.action);

    done();
  });

  it('should handle click events', done => {
    const tree = TestUtils.renderIntoDocument(
      <Notification
        message={MOCK.message}
        action={MOCK.action}
        onClick={MOCK.onClick}
        dismissAfter={MOCK.dismissAfter}
      />
    );

    let wrapper = TestUtils.findRenderedDOMComponentWithClass(tree, 'notification-bar-wrapper');

    TestUtils.Simulate.click(wrapper);

    done();
  });
});

describe('NotificationStack', () => {
  jsdom();

  it('should be a valid element', done => {
    const component = (
      <NotificationStack
        notifications={[MOCK]}
        onDismiss={MOCK.onClick}
      />
    );

    if (TestUtils.isElement(component)) done();
  });

});

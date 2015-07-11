import React from 'react/addons';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import Notification from '../src/notification';

let TestUtils = React.addons.TestUtils;

const MOCK = {
  message: 'Test',
  action: 'Dismiss',
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
  ExecutionEnvironment.canUseDOM = true;

  it('should render message and action text', done => {
    const tree = TestUtils.renderIntoDocument(
      <Notification
        message={MOCK.message}
        action={MOCK.action}
        onClick={MOCK.onClick}
      />
    );

    let message = TestUtils.findRenderedDOMComponentWithClass(tree, 'notification-bar-message');

    let action = TestUtils.findRenderedDOMComponentWithClass(tree, 'notification-bar-action');

    expect(message.props.children).toBe(MOCK.message);
    expect(action.props.children).toBe(MOCK.action);
    done();
  });

  it('should handle click events', done => {
    const tree = TestUtils.renderIntoDocument(
      <Notification
        message={MOCK.message}
        action={MOCK.action}
        onClick={MOCK.onClick}
      />
    );

    let wrapper = TestUtils.findRenderedDOMComponentWithClass(tree, 'notification-bar-wrapper');

    TestUtils.Simulate.click(wrapper);

    done();
  });
});

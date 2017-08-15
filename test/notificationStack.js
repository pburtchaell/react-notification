import React from 'react';
import { Notification, NotificationStack } from '../src/index';
import mockNotification from './mockNotification';

describe('<NotificationStack />', () => {
  let notifications;

  beforeEach(() => {
    notifications = [
      mockNotification,
      Object.assign({}, mockNotification, { key: 2222 })
    ];
  });

  it('notification prop isActive set to false after deactivate called in onClick', (done) => {

    const myNotification = Object.assign(
      {},
      mockNotification,
      { onClick: (notification, deactivate) => deactivate() }
    );

    const wrapper = mount(
      <NotificationStack
        notifications={[myNotification]}
        onDismiss={() => null}
      />
    );

    const notification = wrapper.find(Notification);
    const action = notification.find('.notification-bar-action');
    setTimeout(() => {
      expect(notification.prop('isActive')).to.equal(true);
      action.simulate('click');
      expect(notification.prop('isActive')).to.equal(false);
      done();
    }, 10);
  });

  it('notifications dismissed independently if `dismissInOrder` set to false', (done) => {
    const handleDismiss = spy();

    const wrapper = mount(
      <NotificationStack
        dismissInOrder={false}
        notifications={notifications}
        onDismiss={handleDismiss}
      />
    );

    wrapper.update();

    setTimeout(() => {
      try {
        expect(handleDismiss.calledTwice).to.equal(true);
        done();
      } catch (error) {
        throw error;
      }
      // Add time due to each StackedNotification transition time ( > 300 )
    }, mockNotification.dismissAfter + 340);
  });

  it('should not dismiss when `dismissAfter` is `false`', (done) => {
    const handleDismiss = spy();

    const wrapper = mount(
      <NotificationStack
        notifications={[{ ...mockNotification, dismissAfter: false }]}
        onDismiss={handleDismiss}
      />
    );

    wrapper.update();

    setTimeout(() => {
      try {
        expect(handleDismiss.called).to.equal(false);
        done();
      } catch (error) {
        throw error;
      }
      // Add time due to each StackedNotification transition time ( > 300 )
    }, mockNotification.dismissAfter + 340);
  });

  it('should fire onClick with argument `deactivate`', (done) => {
    const wrapper = mount(
      <NotificationStack
        notifications={[{
          ...mockNotification,
          onClick: (notification, deactivate) => {
            expect(deactivate).to.be.a('function');
            done();
          }
        }]}
        onDismiss={() => null}
      />
    );

    const notification = wrapper.find('.notification-bar-action');
    notification.simulate('click');
  });

  it('should dismiss when `dismissAfter` is updated to a number after it was `false`', (done) => {
    const handleDismiss = spy();

    let dismissAfter = 0;

    const wrapper = mount(
      <NotificationStack
        dismissInOrder={false}
        notifications={[{ ...mockNotification, dismissAfter: false }]}
        onDismiss={handleDismiss}
      />
    );
    wrapper.update();

    const isDismissed = (called, callback) => {
      setTimeout(() => {
        try {
          expect(handleDismiss.called).to.equal(called);
          callback();
        } catch (err) {
          callback(err);
        }
        // Add time due to each StackedNotification transition time ( > 300 )
      }, dismissAfter + 440);
    };

    isDismissed(false, (err) => {
      if (err) return done(err);
      dismissAfter = 110;
      wrapper.setProps({
        notifications: [{ ...mockNotification, dismissAfter }]
      }, () => {
        isDismissed(true, done);
      });
    });
  });

  it('barStyleFactory should set correct style on notification', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { bottom: `${index}px` }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        barStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('barStyle').bottom).to.equal('0px');
  });

  it('barStyleFactory should respect notification barStyle', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { bottom: `${index}px` }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        barStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('barStyle').background).to.equal('rgb(2, 2, 2)');
  });

  it('barStyleFactory should have access to notification', () => {
    const styleFactory = (index, style, notification) => Object.assign(
      {},
      style,
      { bottom: `${index}px`, color: notification.key === 1111111 ? 'green' : 'red' }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        barStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('barStyle').color).to.equal('green');
  });

  it('activeBarStyleFactory should set correct style on notification', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { bottom: `${index + 2}px` }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        activeBarStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('activeBarStyle').bottom).to.equal('2px');
  });

  it('activeBarStyleFactory should respect notification actionBarStyle', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { bottom: `${index}px` }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        activeBarStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('activeBarStyle').left).to.equal('4rem');
  });

  it('activeBarStyleFactory should have access to notification', () => {
    const styleFactory = (index, style, notification) => Object.assign(
      {},
      style,
      { bottom: `${index}px`, color: notification.key === 1111111 ? 'green' : 'red' }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        activeBarStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('activeBarStyle').color).to.equal('green');
  });

  it('actionStyleFactory should set correct style on notification', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { color: 'blue' }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        actionStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('actionStyle').color).to.equal('blue');
  });

  it('actionStyleFactory should respect notification actionBarStyle', () => {
    const styleFactory = (index, style) => Object.assign(
      {},
      style,
      { color: 'blue' }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        actionStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('actionStyle').letterSpacing).to.equal('.125ex');
  });

  it('actionStyleFactory should have access to notification', () => {
    const styleFactory = (index, style, notification) => Object.assign(
      {},
      style,
      { color: notification.key === 1111111 ? 'green' : 'red' }
    );

    const stack = mount(
      <NotificationStack
        notifications={[mockNotification]}
        actionStyleFactory={styleFactory}
        onDismiss={() => {}}
      />
    );

    const notification = stack.find(Notification);

    expect(notification.prop('actionStyle').color).to.equal('green');
  });

  /**
   * Test: Global handling of onClick:
   *
   * If a child notification in the stack does not have an onClick property,
   * then fire onClick at the parent (<NotificationStack />) level.
   *
   * Because the mockNotification we used for other tests includes an
   * onClick property, we need use a different mock notification.
   */
  it('onClick fires globally when notification action is clicked', () => {
    const handleClickGlobal = spy();

    // Render a notification stack with one notification child
    const wrapper = mount(
      <NotificationStack
        notifications={[{
          key: '0',
          message: 'Foo',
          action: 'Dismiss',
          dismissAfter: 100,
          title: 'Title'

          // No onClick property on the notification child
          // onClick: () => {}
        }]}

        // Instead, it is handled globally
        onClick={handleClickGlobal}
        onDismiss={() => {}}
      />
    );

    // Simulate a click on the notification in the stack
    const notification = wrapper.find('.notification-bar-action');
    notification.simulate('click');

    // Expect handleClick to be caled once
    expect(handleClickGlobal).to.have.property('callCount', 1);
  });

  /**
   * Test: Local handling of onClick:
   *
   * If a child notification in the stack has an onClick property,
   * then fire onClick on the child.
   */
  it('onClick fires locally when notification action is clicked', () => {
    const handleClickLocal = spy();
    const handleClickGlobal = spy();

    // Render a notification stack with one notification child
    const wrapper = mount(
      <NotificationStack
        notifications={[{
          key: mockNotification.key,
          message: mockNotification.message,
          action: mockNotification.action,
          dismissAfter: mockNotification.dismissAfter,
          title: mockNotification.title,
          onClick: handleClickLocal
        }]}

        // Instead, it is handled globally
        onClick={handleClickGlobal}
        onDismiss={() => {}}
      />
    );

    // Simulate a click on the notification in the stack
    const notification = wrapper.find('.notification-bar-action');
    notification.simulate('click');

    // Expect local to be called once and global to be called 0
    expect(handleClickLocal).to.have.property('callCount', 1);
    expect(handleClickGlobal).to.have.property('callCount', 0);
  });

  it('onDismiss fires for notification', (done) => {
    const handleDismiss = spy();

    const wrapper = mount(
      <NotificationStack
        notifications={notifications}
        onDismiss={handleDismiss}
      />
    );

    wrapper.update();

    setTimeout(() => {
      try {
        expect(handleDismiss.callCount).to.equal(notifications.length);
        done();
      } catch (error) {
        throw error;
      }

      // Add transition time + 1000ms per each Notification
    }, mockNotification.dismissAfter + 1340);
  });

  it('onDismiss does not fire until `dismissAfter` value times out', () => {
    const handleDismiss = spy();

    // eslint-disable-next-line
    const wrapper = shallow(
      <NotificationStack
        notifications={[mockNotification]}
        onDismiss={handleDismiss}
      />
    );

    expect(handleDismiss.calledOnce).to.equal(false);
  });

  it('onDismiss fires after `dismissAfter` value', (done) => {
    const handleDismiss = spy();

    const wrapper = mount(
      <NotificationStack
        notifications={notifications}
        onDismiss={handleDismiss}
      />
    );

    wrapper.update();

    setTimeout(() => {
      try {
        expect(handleDismiss.calledOnce).to.equal(true);
        done();
      } catch (error) {
        throw error;
      }

      // Add time due to each StackedNotification transition time ( > 300 )
    }, mockNotification.dismissAfter + 340);
  });
});

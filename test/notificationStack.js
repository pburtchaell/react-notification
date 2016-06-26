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

  it('onDismiss fires after `dismissAfter` value + transition time', done => {
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
      } catch (e) {
        done(e);
      }
      // Add time due to each StackedNotification transition time ( > 300 )
    }, mockNotification.dismissAfter + 340);
  });

  it('onDismiss fires on each Notification in the stack', done => {
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
      } catch (e) {
        done(e);
      }
      // Add transition time + 1000ms per each Notification
    }, mockNotification.dismissAfter + 1340);
  });

  it('onDismiss does not fire until `dismissAfter` value times out', () => {
    const handleDismiss = spy();

    const wrapper = shallow(
      <NotificationStack
        notifications={[mockNotification]}
        onDismiss={handleDismiss}
      />
    );

    expect(handleDismiss.calledOnce).to.equal(false);
  });
});

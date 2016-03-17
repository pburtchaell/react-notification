import { Notification, NotificationStack } from '../src/index';
import mockNotification from './mockNotification';

describe('<NotificationStack />', () => {
  it('onDismiss fires once', () => {
    const handleDismiss = spy();

    const wrapper = shallow(
      <NotificationStack
        notifications={[mockNotification]}
        onDismiss={handleDismiss}
      />
    );

    setTimeout(() => {
      expect(handleDismiss.calledOnce).to.equal(true);
    }, mockNotification.dismissAfter);
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

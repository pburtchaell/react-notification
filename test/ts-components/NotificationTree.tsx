import * as React from 'react';
import { OrderedSet } from 'immutable';
import { NotificationObject, NotificationStack } from '../../index';

interface State {
  count: number;
  notifications: OrderedSet<NotificationObject>;
}

class NotificationTree extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      notifications: OrderedSet(),
      // This is just used for the sake of an example to make sure
      // notifications have unique keys. In production, you should have
      // a different system for UIDs.
      count: 0
    };

    this.removeNotification = this.removeNotification.bind(this);
  }

  addNotification() {
    const { notifications, count } = this.state;
    const id = notifications.size + 1;
    const newCount = count + 1;
    return this.setState({
      count: newCount,
      notifications: notifications.add({
        message: `Notification ${id}`,
        key: newCount,
        action: 'Dismiss',
        dismissAfter: 3400,
        onClick: () => this.removeNotification(newCount)
      })
    });
  }

  removeNotification(count: number) {
    const { notifications } = this.state;
    // Immutable's filter has a nullable value param for some reason,
    // but the definition has been changed to non-nullable in 4.x.
    // TODO: Remove non-null assertion after upgrading Immutable to >= 4.x.
    // SEE: https://github.com/facebook/immutable-js/issues/1294
    this.setState({
      notifications: notifications.filter(n => n!.key !== count) as OrderedSet<NotificationObject>
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.addNotification.bind(this)}>Add notification</button>
        <NotificationStack
          notifications={this.state.notifications.toArray()}
          onDismiss={notification =>
            this.setState({
              notifications: this.state.notifications.delete(notification)
            })}
        />
      </div>
    );
  }
}

export default NotificationTree;

import React, { Component } from 'react';
import { render } from 'react-dom';
import { OrderedSet } from 'immutable';
import NotificationStack from 'notificationStack';

class Example extends Component {
  state = {
    notifications: OrderedSet(),

    // This is just used for the sake of an example to make sure
    // notifications have unique keys. In production, you should have
    // a different system for UIDs.
    count: 0
  }

  addNotification() {
    const { notifications, count } = this.state;
    const id = notifications.size + 1;
    const newCount = count + 1;

    return this.setState({
      count: newCount,
      notifications: notifications.add({
        message: `Notification ${id}`,
        key: newCount
      })
    });
  }

  render() {
    return (
      <div>
        <button onClick={::this.addNotification}>Add notification</button>
        <NotificationStack
          notifications={this.state.notifications.toArray()}
          onDismiss={notification => this.setState({
            notifications: this.state.notifications.delete(notification)
          })}
        />
      </div>
    );
  }
}

render(<Example />, document.querySelector('#mount'));

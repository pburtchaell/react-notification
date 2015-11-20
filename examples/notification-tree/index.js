import React, { Component } from 'react';
import { render } from 'react-dom';
import { OrderedSet } from 'immutable';
import NotificationStack from 'notificationStack';

class Example extends Component {
  state = {
    notifications: OrderedSet()
  }

  addNotification() {
    return this.setState({
      notifications: this.state.notifications.add({
        message: `Notification ${this.state.notifications.size + 1}`,
        key: `${Math.random()}-${Date.now()}`
      })
    });
  }

  render() {
    return (
      <div>
        <button onClick={::this.addNotification}>Add notification</button>
        <NotificationStack
          notifications={this.state.notifications.toArray()}
          onDismiss={(notification) => {
            this.setState({
              notifications: this.state.notifications.delete(notification)
            });
          }}
        />
      </div>
    );
  }
}

render(<Example />, document.querySelector('#mount'));

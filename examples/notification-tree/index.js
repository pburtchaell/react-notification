import React, { Component } from 'react';
import { render } from 'react-dom';
import { OrderedSet } from 'immutable';
import { NotificationStack } from 'react-notification';

class Example extends Component {
  constructor(props) {
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
        onClick: () => this.removeNotification(newCount),
      })
    });
  }

  removeNotification (count) {
    const { notifications } = this.state;
    this.setState({
      notifications: notifications.filter(n => n.key !== count)
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.addNotification.bind(this)}>
          Add notification
        </button>
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

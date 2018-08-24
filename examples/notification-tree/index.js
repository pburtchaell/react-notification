import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { NotificationStack } from '../../src/index.js';

class NotificationTreeExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      count: 0
    };

    this.addNotification = this.addNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  addNotification() {
    const { notifications, count } = this.state;

    const id = notifications.size + 1;
    const newCount = count + 1;

    this.setState({
      count: newCount,
      notifications: [{
        message: `Notification ${id}`,
        key: newCount,
        action: 'Dismiss',
        dismissAfter: 3400
      }, ...notifications]
    });
  }

  removeNotification(notification) {
    const { notifications } = this.state;

    this.setState({
      notifications: notifications.filter(n => n.key !== notification.key)
    });
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.addNotification}>
          Add notification
        </button>
        <NotificationStack
          notifications={this.state.notifications}
          onDismiss={this.removeNotification}
        />
      </Fragment>
    );
  }
}

render(<NotificationTreeExample />, document.querySelector('#mount'));

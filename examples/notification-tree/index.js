import React, { Component } from 'react';
import { render } from 'react-dom';
import { OrderedSet } from 'immutable';
import { NotificationStack } from 'react-notification';

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: {},
    };

    this.removeNotification = this.removeNotification.bind(this);
    this.renderNotifications = this.renderNotifications.bind(this);
  }


  addNotification() {
    // This is just used for the sake of an example to make sure
    // notifications have unique keys. In production, you should have
    // a different system for UIDs.
    const id = Date.now();

    const notifications = Object.assign({}, this.state.notifications, {
      [id]: {
        action: 'Dismiss',
        dismissAfter: 3400,
        onClick: () => this.removeNotification(id),
        message: `Notification ${id}`,
        key: id
      }
    });

    return this.setState({
      notifications: notifications
    });
  }

  removeNotification (notif) {
    const notifications = Object.assign({}, this.state.notifications);
    delete notifications[notif];

    this.setState({ notifications })
  }
  
  renderNotifications () {
    return Object.keys(this.state.notifications).map(notif => this.state.notifications[notif])
  }

  render() {
    return (
      <div>
        <button onClick={this.addNotification.bind(this)}>
          Add notification
        </button>
        <NotificationStack
          notifications={this.renderNotifications()}
          onDismiss={notif => this.removeNotification(notif.key)}
        />
      </div>
    );
  }
}

render(<Example />, document.querySelector('#mount'));

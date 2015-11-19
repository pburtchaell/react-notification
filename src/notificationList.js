import React, { Component, PropTypes } from 'react';
import StackableNotification from 'stackableNotification';

class NotificationList extends Component {
  render() {
    return (
      <div>
        {
          this.props.notifications.map((notification, i) => <StackableNotification
            {...notification}
            index={i}
            key={`notification${notification.key}`}
            onDismiss={() => {this.props.onDismiss(notification.key)}}
            />)
        }
      </div>

    );
  }
}

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default NotificationList;

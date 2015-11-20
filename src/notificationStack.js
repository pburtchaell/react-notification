import React, { PropTypes } from 'react';
import defaultPropTypes from './defaultPropTypes';
import StackedNotification from './stackedNotification';

/**
 * The notification list does not have any state, so use a
 * pure function here. It just needs to return the stacked array
 * of notification components.
 */
const NotificationStack = (props) => {
  return (
    <div className="notification-list">
      {props.notifications.map((notification, index) => {
        const dismissAfter = notification.dismissAfter || props.dismissAfter;

        return (
          <StackedNotification
            {...notification}
            key={notification.key}
            action={notification.action || props.action}
            dismissAfter={notification.dismissAfter}
            onClick={() => props.onDismiss(notification)}
            onDismiss={() => setTimeout(
              () => props.onDismiss(notification),
              dismissAfter !== null ? dismissAfter : 2000
            )}
            style={{
              bar: {
                bottom: `${2 + index * 4}rem`,
              }
            }}
          />
        );
      })}
    </div>
  )
};

NotificationStack.propTypes = {
  notifications: PropTypes.array.isRequired,
  onDismiss: PropTypes.func
};

export default NotificationStack;

/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import StackedNotification from './stackedNotification';

function defaultStyleFactory(index, style) {
  return Object.assign(
    {},
    style,
    { bottom: `${2 + index * 4}rem` }
  );
}

/**
* The notification list does not have any state, so use a
* pure function here. It just needs to return the stacked array
* of notification components.
*/
const NotificationStack = props => (
  <div className="notification-list">
  {props.notifications.map((notification, index) => {
    const dismissAfter = notification.dismissAfter || props.dismissAfter;
    const isLast = index === 0 && props.notifications.length === 1;
    const barStyle = props.barStyleFactory(index, notification.barStyle);
    const activeBarStyle = props.activeBarStyleFactory(index, notification.activeBarStyle);

    return (
      <StackedNotification
        {...notification}
        key={notification.key}
        isLast={isLast}
        action={notification.action || props.action}
        dismissAfter={isLast ? dismissAfter : dismissAfter + (index * 1000)}
        onDismiss={props.onDismiss.bind(this, notification)}
        activeBarStyle={activeBarStyle}
        barStyle={barStyle}
      />
    );
  })}
  </div>
);

NotificationStack.propTypes = {
  activeBarStyleFactory: PropTypes.func,
  barStyleFactory: PropTypes.func,
  notifications: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};

NotificationStack.defaultProps = {
  dismissAfter: 1000,
  activeBarStyleFactory: defaultStyleFactory,
  barStyleFactory: defaultStyleFactory
};

export default NotificationStack;

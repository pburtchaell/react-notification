/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import StackedNotification from './stackedNotification';

function defaultStyleFactory(index, style) {
  return Object.assign(
    {},
    style,
    { bottom: `${2 + (index * 4)}rem` }
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
      const isLast = index === 0 && props.notifications.length === 1;
      const dismissNow = isLast || !props.dismissInOrder;
      let { dismissAfter } = notification;
      if (dismissAfter !== false) {
        if (dismissAfter == null) dismissAfter = props.dismissAfter;
        if (!dismissNow) dismissAfter += index * 1000;
      }
      const barStyle = props.barStyleFactory(index, notification.barStyle);
      const activeBarStyle = props.activeBarStyleFactory(index, notification.activeBarStyle);

      return (
        <StackedNotification
          {...notification}
          key={notification.key}
          isLast={isLast}
          action={notification.action || props.action}
          dismissAfter={dismissAfter}
          onDismiss={props.onDismiss.bind(this, notification)}
          activeBarStyle={activeBarStyle}
          barStyle={barStyle}
        />
      );
    })}
  </div>
);

/* eslint-disable react/no-unused-prop-types, react/forbid-prop-types */

NotificationStack.propTypes = {
  activeBarStyleFactory: PropTypes.func,
  barStyleFactory: PropTypes.func,
  dismissInOrder: PropTypes.bool.isRequired,
  notifications: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};


NotificationStack.defaultProps = {
  activeBarStyleFactory: defaultStyleFactory,
  barStyleFactory: defaultStyleFactory,
  dismissInOrder: true,
  dismissAfter: 1000
};

/* eslint-enable no-alert, no-console */

export default NotificationStack;

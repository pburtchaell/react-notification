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

      // Handle styles
      const barStyle = props.barStyleFactory(index, notification.barStyle);
      const activeBarStyle = props.activeBarStyleFactory(index, notification.activeBarStyle);

      // Allow onClick from notification stack or individual notifications
      const onClick = notification.onClick || props.onClick;
      const onDismiss = props.onDismiss;

      let { dismissAfter } = notification;

      if (dismissAfter !== false) {
        if (dismissAfter == null) dismissAfter = props.dismissAfter;
        if (!dismissNow) dismissAfter += index * 1000;
      }

      return (
        <StackedNotification
          {...notification}
          key={notification.key}
          isLast={isLast}
          action={notification.action || props.action}
          dismissAfter={dismissAfter}
          onDismiss={onDismiss.bind(this, notification)}
          onClick={onClick.bind(this, notification)}
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
  dismissInOrder: PropTypes.bool,
  notifications: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  action: PropTypes.string
};


NotificationStack.defaultProps = {
  activeBarStyleFactory: defaultStyleFactory,
  barStyleFactory: defaultStyleFactory,
  dismissInOrder: true,
  dismissAfter: 1000,
  onClick: () => {}
};

/* eslint-enable no-alert, no-console */

export default NotificationStack;

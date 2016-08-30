'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultPropTypes = require('./defaultPropTypes');

var _defaultPropTypes2 = _interopRequireDefault(_defaultPropTypes);

var _stackedNotification = require('./stackedNotification');

var _stackedNotification2 = _interopRequireDefault(_stackedNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultStyleFactory(index, style) {
  return _extends({}, style, {
    bottom: 2 + index * 4 + 'rem'
  });

  // Object.assign(
  //   {},
  //   style,
  //   { bottom: `${2 + index * 4}rem` }
  // );
}

/**
 * The notification list does not have any state, so use a
 * pure function here. It just needs to return the stacked array
 * of notification components.
 */
var NotificationStack = function NotificationStack(props) {
  return _react2.default.createElement(
    'div',
    { className: 'notification-list' },
    props.notifications.map(function (notification, index) {
      var dismissAfter = notification.dismissAfter || props.dismissAfter;
      var isLast = index === 0 && props.notifications.length === 1;
      var barStyle = props.barStyleFactory(index, notification.barStyle);
      var activeBarStyle = props.activeBarStyleFactory(index, notification.activeBarStyle);

      return _react2.default.createElement(_stackedNotification2.default, _extends({}, notification, {
        key: notification.key,
        isLast: isLast,
        action: notification.action || props.action,
        dismissAfter: isLast ? dismissAfter : dismissAfter + index * 1000,
        onDismiss: props.onDismiss.bind(undefined, notification),
        activeBarStyle: activeBarStyle,
        barStyle: barStyle
      }));
    })
  );
};

NotificationStack.propTypes = {
  activeBarStyleFactory: _react.PropTypes.func,
  barStyleFactory: _react.PropTypes.func,
  notifications: _react.PropTypes.array.isRequired,
  onDismiss: _react.PropTypes.func.isRequired
};

NotificationStack.defaultProps = {
  dismissAfter: 1000,
  activeBarStyleFactory: defaultStyleFactory,
  barStyleFactory: defaultStyleFactory
};

exports.default = NotificationStack;
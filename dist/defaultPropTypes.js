'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

exports.default = {
  message: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]).isRequired,
  action: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string, _react.PropTypes.node]),
  onClick: _react.PropTypes.func,
  style: _react.PropTypes.bool,
  actionStyle: _react.PropTypes.object,
  barStyle: _react.PropTypes.object,
  activeBarStyle: _react.PropTypes.object,
  dismissAfter: _react.PropTypes.number,
  onDismiss: _react.PropTypes.func,
  className: _react.PropTypes.string,
  activeClassName: _react.PropTypes.string.isRequired,
  isActive: _react.PropTypes.bool,
  title: _react.PropTypes.string
};
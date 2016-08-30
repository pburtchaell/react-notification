'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StackedNotification = function (_Component) {
  _inherits(StackedNotification, _Component);

  function StackedNotification(props) {
    _classCallCheck(this, StackedNotification);

    var _this = _possibleConstructorReturn(this, (StackedNotification.__proto__ || Object.getPrototypeOf(StackedNotification)).call(this, props));

    _this.state = {
      isActive: false
    };
    return _this;
  }

  _createClass(StackedNotification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.activeTimeout = setTimeout(this.setState.bind(this, {
        isActive: true
      }), 1);

      this.dismissTimeout = setTimeout(this.setState.bind(this, {
        isActive: false
      }), this.props.dismissAfter);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.dismissTimeout);
      clearTimeout(this.dismissTimeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_notification2.default, _extends({}, this.props, {
        onDismiss: function onDismiss() {
          return setTimeout(_this2.props.onDismiss, 300);
        },
        isActive: this.state.isActive
      }));
    }
  }]);

  return StackedNotification;
}(_react.Component);

;

exports.default = StackedNotification;
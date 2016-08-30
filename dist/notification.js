'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultPropTypes = require('./defaultPropTypes');

var _defaultPropTypes2 = _interopRequireDefault(_defaultPropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notification = function (_Component) {
  _inherits(Notification, _Component);

  function Notification(props) {
    _classCallCheck(this, Notification);

    var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

    _this.getBarStyle = _this.getBarStyle.bind(_this);
    _this.getActionStyle = _this.getActionStyle.bind(_this);
    _this.getTitleStyle = _this.getTitleStyle.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);

    if (props.onDismiss && props.isActive) {
      _this.dismissTimeout = setTimeout(props.onDismiss, props.dismissAfter);
    }
    return _this;
  }

  _createClass(Notification, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.hasOwnProperty('isLast')) clearTimeout(this.dismissTimeout);
      if (nextProps.onDismiss && nextProps.isActive && !this.props.isActive) {
        this.dismissTimeout = setTimeout(nextProps.onDismiss, nextProps.dismissAfter);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.dismissTimeout);
    }

    /*
     * @description Dynamically get the styles for the bar.
     * @returns {object} result The style.
     */

  }, {
    key: 'getBarStyle',
    value: function getBarStyle() {
      if (this.props.style === false) return {};

      var _props = this.props;
      var isActive = _props.isActive;
      var barStyle = _props.barStyle;
      var activeBarStyle = _props.activeBarStyle;


      var baseStyle = {
        position: 'fixed',
        bottom: '2rem',
        left: '-100%',
        width: 'auto',
        padding: '1rem',
        margin: 0,
        color: '#fafafa',
        font: '1rem normal Roboto, sans-serif',
        borderRadius: '5px',
        background: '#212121',
        borderSizing: 'border-box',
        boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
        cursor: 'default',
        WebKittransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        MozTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        msTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        OTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        transition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
        WebkitTransform: 'translatez(0)',
        MozTransform: 'translatez(0)',
        msTransform: 'translatez(0)',
        OTransform: 'translatez(0)',
        transform: 'translatez(0)'
      };

      // return isActive ? Object.assign({}, baseStyle, {
      //   left: '1rem'
      // }, barStyle, activeBarStyle) : Object.assign({}, baseStyle, barStyle);
      return isActive ? _extends({}, baseStyle, {
        left: '1rem'
      }, barStyle, activeBarStyle) : _extends({}, baseStyle, barStyle);
    }
    /*
     * @function getActionStyle
     * @description Dynamically get the styles for the action text.
     * @returns {object} result The style.
     */

  }, {
    key: 'getActionStyle',
    value: function getActionStyle() {
      return this.props.style !== false ? _extends({
        padding: '0.125rem',
        marginLeft: '1rem',
        color: '#f44336',
        font: '.75rem normal Roboto, sans-serif',
        lineHeight: '1rem',
        letterSpacing: '.125ex',
        textTransform: 'uppercase',
        borderRadius: '5px',
        cursor: 'pointer'
      }, this.props.actionStyle) : {};
    }

    /*
     * @function getTitleStyle
     * @description Dynamically get the styles for the title.
     * @returns {object} result The style.
     */

  }, {
    key: 'getTitleStyle',
    value: function getTitleStyle() {
      return this.props.style !== false ? _extends({
        fontWeight: '700',
        marginRight: '.5rem'
      }, this.props.titleStyle) : {};
    }

    /*
     * @function handleClick
     * @description Handle click events on the action button.
     */

  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (this.props.onClick && typeof this.props.onClick === 'function') {
        return this.props.onClick();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'notification-bar';

      if (this.props.isActive) className += ' ' + this.props.activeClassName;
      if (this.props.className) className += ' ' + this.props.className;

      return _react2.default.createElement(
        'div',
        { className: className, style: this.getBarStyle() },
        _react2.default.createElement(
          'div',
          { className: 'notification-bar-wrapper' },
          this.props.title ? _react2.default.createElement(
            'span',
            {
              ref: 'title',
              className: 'notification-bar-title',
              style: this.getTitleStyle()
            },
            this.props.title
          ) : null,
          _react2.default.createElement(
            'span',
            {
              ref: 'message',
              className: 'notification-bar-message'
            },
            this.props.message
          ),
          this.props.action ? _react2.default.createElement(
            'span',
            {
              ref: 'action',
              className: 'notification-bar-action',
              onClick: this.handleClick,
              style: this.getActionStyle()
            },
            this.props.action
          ) : null
        )
      );
    }
  }]);

  return Notification;
}(_react.Component);

Notification.propTypes = _defaultPropTypes2.default;

Notification.defaultProps = {
  isActive: false,
  dismissAfter: 2000,
  activeClassName: 'notification-bar-active'
};

exports.default = Notification;
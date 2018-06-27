import React, { Component } from 'react';
import defaultPropTypes from './defaultPropTypes';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.getBarStyle = this.getBarStyle.bind(this);
    this.getActionStyle = this.getActionStyle.bind(this);
    this.getTitleStyle = this.getTitleStyle.bind(this);
    this.handleClick = this.handleClick.bind(this);

    if (props.onDismiss && props.isActive) {
      this.dismissTimeout = setTimeout(
        props.onDismiss,
        props.dismissAfter
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dismissAfter === false) return;

    // See http://eslint.org/docs/rules/no-prototype-builtins
    if (!{}.hasOwnProperty.call(nextProps, 'isLast')) {
      clearTimeout(this.dismissTimeout);
    }

    if (nextProps.onDismiss) {
      if (
        (nextProps.isActive && !this.props.isActive) ||
        (nextProps.dismissAfter && this.props.dismissAfter === false)
      ) {
        this.dismissTimeout = setTimeout(
          nextProps.onDismiss,
          nextProps.dismissAfter
        );
      }
    }
  }

  componentWillUnmount() {
    if (this.props.dismissAfter) clearTimeout(this.dismissTimeout);
  }

  /*
  * @description Dynamically get the styles for the bar.
  * @returns {object} result The style.
  */
  getBarStyle() {
    if (this.props.style === false) return {};

    const { isActive, barStyle, activeBarStyle } = this.props;

    const baseStyle = {
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
      WebKitTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
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

    return isActive ?
      Object.assign({}, baseStyle, { left: '1rem' }, barStyle, activeBarStyle) :
      Object.assign({}, baseStyle, barStyle);
  }

  /*
  * @function getActionStyle
  * @description Dynamically get the styles for the action text.
  * @returns {object} result The style.
  */
  getActionStyle() {
    return this.props.style !== false ? Object.assign({}, {
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
  getTitleStyle() {
    return this.props.style !== false ? Object.assign({}, {
      fontWeight: '700',
      marginRight: '.5rem'
    }, this.props.titleStyle) : {};
  }

  /*
  * @function handleClick
  * @description Handle click events on the action button.
  */
  handleClick() {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      return this.props.onClick();
    }
  }

  render() {
    let className = 'notification-bar';

    if (this.props.isActive) className += ` ${this.props.activeClassName}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className} style={this.getBarStyle()}>
        <div className="notification-bar-wrapper">
          {this.props.title ? (
            <span
              className="notification-bar-title"
              style={this.getTitleStyle()}
            >
              {this.props.title}
            </span>
          ) : null}

          {/* eslint-disable */}
          <span className="notification-bar-message">
            {this.props.message}
          </span>

          {this.props.action ? (
            <span
              className="notification-bar-action"
              onClick={this.handleClick}
              style={this.getActionStyle()}
            >
              {this.props.action}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

Notification.propTypes = defaultPropTypes;

Notification.defaultProps = {
  isActive: false,
  dismissAfter: 2000,
  activeClassName: 'notification-bar-active'
};

export default Notification;

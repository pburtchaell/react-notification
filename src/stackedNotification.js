/* linting temp disabled while working on updates */
/* eslint-disable */
import React, { Component } from 'react';
import defaultPropTypes from './defaultPropTypes';
import Notification from './notification';

class StackedNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.activeTimeout = setTimeout(this.setState.bind(this, {
      isActive: true
    }), 1);

    this.dismiss(this.props.dismissAfter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dismissAfter !== this.props.dismissAfter) {
      this.dismiss(nextProps.dismissAfter);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.activeTimeout);
    clearTimeout(this.dismissTimeout);
  }

  dismiss(dismissAfter) {
    if (dismissAfter === false) return;

    this.dismissTimeout = setTimeout(this.setState.bind(this, {
      isActive: false
    }), dismissAfter);
  }

  /*
  * @function handleClick
  * @description Bind deactivate Notification function to Notification click handler
  */
  handleClick() {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      return this.props.onClick(this.setState.bind(this, { isActive: false }));
    }
  }

  render() {
    return (
      <Notification
        {...this.props}
        onClick={this.handleClick}
        onDismiss={() => setTimeout(this.props.onDismiss, 300)}
        isActive={this.state.isActive}
      />
    );
  }
}

StackedNotification.propTypes = defaultPropTypes;

export default StackedNotification;

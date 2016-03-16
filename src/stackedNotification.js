import React, { Component, PropTypes } from 'react';
import Notification from './notification';

/**
 * The notification list does not have any state, so use a
 * pure function here. It just needs to return the stacked array
 * of notification components.
 */
class StackedNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  componentDidMount() {
    setTimeout(this.setState.bind(this, {
      isActive: true
    }), 1);

    setTimeout(this.setState.bind(this, {
      isActive: false
    }), this.props.dismissAfter);
  }

  render() {
    return (
      <Notification
        {...this.props}
        action={false}
        isActive={this.state.isActive}
      />
    );
  }
};

StackedNotification.propTypes = {};

export default StackedNotification;

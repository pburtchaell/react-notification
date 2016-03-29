import React, { Component } from 'react';
import Notification from './notification';

/**
 * The notification list does not have any state, so use a
 * pure function here. It just needs to return the stacked array
 * of notification components.
 */
class StackedNotification extends Component {
  state = {
    isActive: true
  };

  componentDidMount() {
    this._showTimeout = setTimeout(() => this.setState({ isActive: true }), 1);
    this._hideTimeout = setTimeout(() => this.setState({ isActive: false }), this.props.dismissAfter);
  }

  componentWillUnmount() {
    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);
  }

  render() {
    const bottomPosition = `${2 + this.props.index * 4}rem`;

    return (
      <Notification
        {...this.props}
        action={false}
        isActive={this.state.isActive}
        barStyle={{ bottom: bottomPosition, ...this.props.barStyle }}
        activeBarStyle={{ bottom: bottomPosition, ...this.props.activeBarStyle }}
      />
    );
  }
};

export default StackedNotification;

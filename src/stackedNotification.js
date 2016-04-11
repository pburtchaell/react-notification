import React, { Component } from 'react';
import Notification from './notification';

class StackedNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  componentDidMount() {
    this.activeTimeout = setTimeout(this.setState.bind(this, {
      isActive: true
    }), 1);

    this.dismissTimeout = setTimeout(this.setState.bind(this, {
      isActive: false
    }), this.props.dismissAfter);
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimeout);
  }

  render() {
    const bottomPosition = `${2 + this.props.index * 4}rem`;

    return (
      <Notification
        {...this.props}
        isActive={this.state.isActive}
        barStyle={Object.assign({}, {
          bottom: bottomPosition
        }, this.props.barStyle)}
        activeBarStyle={Object.assign({}, {
          bottom: bottomPosition
        }, this.props.activeBarStyle)}
      />
    );
  }
};

export default StackedNotification;

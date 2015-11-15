import React, { Component, PropTypes } from 'react';
import Notification from 'notification';

class StackableNotification extends Component {
  constructor() {
    super();
    this.state = {active: false};
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    // react-notification will not animate if mounted with isActive=true
    // mount it with false and wait till next cycle to update it to true
    setTimeout(this.setState.bind(this, {active: true}), 1);
  }

  onDismiss() {
    this.setState({active: false});

    // animation length for react-notification is half a second
    setTimeout(this.props.onDismiss, 500);
  }

  render() {
    const onClick = () => {
      this.props.onClick && this.props.onClick();
      this.onDismiss();
    };

    return (
      <Notification
        message={this.props.message}
        action={this.props.action || 'dismiss'}
        dismissAfter={this.props.dismissAfter}
        isActive={this.state.active}
        onClick={onClick}
        onDismiss={this.onDismiss}
        style={{
                  active: {
                    left: '1em'
                  },
                  bar: {
                    bottom: `${2 + this.props.index * 4}em`,
                    padding: '1em',
                    font: '1em normal Roboto, sans-serif',
                    zIndex: 1
                  },
                  action: {
                    padding: '0.125em',
                    marginLeft: '1em',
                    font: '.75em normal Roboto, sans-serif',
                    lineHeight: '1em'
                  }
                }}
        className={this.props.className}
        activeClassName={this.props.activeClassName}/>
    );
  }
}

StackableNotification.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  index: PropTypes.number.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  dismissAfter: PropTypes.number,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
};

export default StackableNotification;

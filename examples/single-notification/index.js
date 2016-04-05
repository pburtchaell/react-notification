import React, { Component } from 'react';
import { render } from 'react-dom';
import { Notification } from 'react-notification';

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    }
  }

  toggleNotification() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    const { isActive } = this.state;

    return (
      <div>
        <button
          onClick={this.toggleNotification.bind(this)}
          children={!isActive ? "Show notification" : "Hide notification"}
        />
        <Notification
          isActive={this.state.isActive}
          message="Notification"
          action="Dismiss"
          title="Title!"
          onDismiss={this.toggleNotification.bind(this)}
          onClick={() =>  this.setState({ isActive: false })}
        />
      </div>
    );
  }
}

render(<Example />, document.querySelector('#mount'));

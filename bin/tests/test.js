import React from 'react';
import Notification from 'notification';

var View = React.createClass({

  handleShow() {
    console.log('Notification hidden:', false);
    this.refs.notification.show();
  },

  handleHide() {
    console.log('Notification hidden:', true);
    this.refs.notification.hide();
  },

  handleNotificationActionClick() {
    console.log('Notification action clicked:', true);
  },

  getInitialState() {
    return {
      message: 'Todo added',
      action: 'Undo'
    };
  },

  render() {
    return (
      <div>
        <button onClick={this.handleShow}>Show</button>
        <button onClick={this.handleHide}>Hide</button>
        <Notification
          ref="notification"
          message={this.state.message}
          action={this.state.action}
          onClick={this.handleNotificationActionClick}/>
      </div>
    );
  }

});

React.render(
  <View />,
  document.querySelector('main')
);

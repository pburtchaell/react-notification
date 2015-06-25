import React from 'react';
import Notification from '../../dist/notification';

var View = React.createClass({

  handleShow() {
    console.log('Notification hidden:', false);
    this.refs.notification.show();
  },

  handleHide() {
    console.log('Notification hidden:', true);
    this.refs.notification.hide();
  },

  handleShowDefaultTimed() {
    this.refs.timedNotification.show();
  },

  handleShowCustomTimed() {
    this.setState({timer: 5000});
    this.refs.timedNotification.show();
  },

  handleNotificationActionClick() {
    console.log('Notification action clicked:', true);
  },

  getNotificationStyles() {

    var bar = {
      background: '#263238'
    };

    var action = {
      color: '#FFCCBC'
    };

    return { bar, action };

  },

  getInitialState() {
    return {
      message: 'Todo added',
      action: 'Undo',
      timer: 2000
    };
  },

  render() {
    return (
      <div>
        <button onClick={this.handleShow}>Show</button>
        <button onClick={this.handleHide}>Hide</button>
        <button onClick={this.handleShowDefaultTimed}>ShowTimedDefault</button>
        <button onClick={this.handleShowCustomTimed}>ShowTimed5s</button>
        <Notification
          ref="notification"
          message={this.state.message}
          action={this.state.action}
          styles={this.getNotificationStyles()}
          onClick={this.handleNotificationActionClick}/>
        <Notification
          ref="timedNotification"
          message={this.state.message}
          action={this.state.action}
          styles={this.getNotificationStyles()}
          dismissAfter={this.state.timer}
          onClick={this.handleNotificationActionClick}/>
      </div>
    );
  }

});

React.render(
  <View />,
  document.querySelector('main')
);

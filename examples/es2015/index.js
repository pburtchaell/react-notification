import React, { Component } from 'react';
import { render } from 'react-dom';
import Notification from 'notification';
import NotificationList from 'notificationList';

class Example extends Component {
  state = {
    notificationReact: {
      message: 'React is awesome!',
      action: 'I agree',
      isActive: false,
      dismissAfter: 2000
    },
    notificationJavaScript: {
      message: 'JavaScript is awesome!',
      action: false,
      isActive: false,
      dismissAfter: 2000
    },
    notifications: [
      {
        message: 'React is awesome!',
        dismissAfter: 10000,
        key: 'uniqueKey1'
      },
      {
        message: 'React is really awesome!',
        dismissAfter: 10000,
        key: 'uniqueKey2'
      },
      {
        message: 'jQuery is great!',
        action: 'undo',
        dismissAfter: 10000,
        onClick: () => { alert('React!'); },
        key: 'uniqueKey3'
      }
    ]
  }

  /*
   * @function handleNotificationClick
   * @description When the notfication action button
   * is clicked, dismiss the notfication by setting
   * the isActive prop to false.
   */
  handleNotificationClick = (notification) => {
    if (notification === 'react') {
      this.setState({
        notificationReact: {
          ...this.state.notificationReact,
          isActive: false
        }
      });
    } else {
      this.setState({
        notificationJavaScript: {
          ...this.state.notificationJavaScript,
          isActive: false
        }
      });
    }
  }

  handleButtonClick = (notification) => {
    if (notification === 'react') {
      this.setState({
        notificationReact: {
          ...this.state.notificationReact,
          isActive: true
        }
      });
    } else {
      this.setState({
        notificationJavaScript: {
          ...this.state.notificationJavaScript,
          isActive: true
        }
      });
    }
  }

  handleListButtonClick = () => {
    let nextNotifications = this.state.notifications.slice(); //clone the array
    nextNotifications.push({
      message: 'Another notification',
      dismissAfter: 10000,
      key: Math.random()
    });
    this.setState({notifications: nextNotifications});
  }

  handleDismissListItem = (key) => {
    const nextNotifications = this.state.notifications.filter(n => n.key !== key);
    this.setState({notifications: nextNotifications});
  }

  render() {
    let { notificationReact, notificationJavaScript } = this.state;

    return (
      <div>
        <button onClick={this.handleButtonClick.bind(null, 'react')}>
          Show 1
        </button>
        <button onClick={this.handleButtonClick.bind(null, 'javascript')}>
          Show 2
        </button>
        <button onClick={this.handleListButtonClick}>
          Add to list
        </button>
        <Notification
          ref="notificationOne"
          style={{
            bar: {
              backgroundColor: 'rgb(97, 172, 234)'
            },
            action: {
              color: 'rgb(20, 27, 32)'
            }
          }}
          {...notificationReact}
          onClick={this.handleNotificationClick.bind(null, 'react')}
          onDismiss={this.handleNotificationClick.bind(null, 'react')}
        />
        <Notification
          ref="notficationTwo"
          style={{
            bar: {
              bottom: '6rem',
              backgroundColor: 'rgb(249, 211, 18)',
              color: 'rgb(0, 0, 0)'
            },
            action: {
              color: 'rgb(0, 0, 0)'
            }
          }}
          {...notificationJavaScript}
          onClick={this.handleNotificationClick.bind(null, 'javascript')}
          onDismiss={this.handleNotificationClick.bind(null, 'javascript')}
        />
        <NotificationList
          notifications={this.state.notifications}
          onDismiss={this.handleDismissListItem}/>
      </div>
    );
  }
}

render(<Example />, document.querySelector('#mount'));

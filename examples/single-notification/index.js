import React, { Component } from 'react';
import { render } from 'react-dom';
import Notification from 'notifcation';

class Example extends Component {
  state = {
    notification: {

    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

render(<Example />, document.querySelector('#mount'));

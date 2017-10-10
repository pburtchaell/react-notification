import * as React from 'react';
import { render } from 'react-dom';
import { Notification } from '../../index';

interface State {
  isActive: boolean;
  permanentNotification: boolean;
}

class SingleNotification extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isActive: false,
      permanentNotification: false
    };
  }

  toggleNotification() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() {
    const { isActive } = this.state;

    return (
      <div>
        <button
          onClick={this.toggleNotification.bind(this)}
          children={!isActive ? 'Show notification' : 'Hide notification'}
        />
        <br />
        <button
          onClick={() =>
            this.setState({
              permanentNotification: true
            })}
          children="Show permanent notification"
        />
        <Notification
          isActive={this.state.isActive}
          message="Notification"
          action="Dismiss"
          title="Title!"
          onDismiss={this.toggleNotification.bind(this)}
          onClick={() => this.setState({ isActive: false })}
        />
        <Notification
          isActive={this.state.permanentNotification}
          dismissAfter={false}
          message="Permanent Notification"
          title="Title!"
        />
      </div>
    );
  }
}

render(<SingleNotification />, document.querySelector('#mount'));

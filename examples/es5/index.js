var React = require('react');
var Notification = require('notification');

var Example = React.createClass({
  getInitialState: function () {
    return {
      message: 'React is awesome!',
      action: 'I agree',
      dismissAfter: 2000,
      isActive: true
    };
  },

  handleClick: function () {
    this.setState({
      notification: {
        isActive: true,
      },
    });
  },

  render: function () {
    return (
      <div>
        <button onClick={this.handleClick}>Show</button>
        <Notification
          message={this.state.message}
          action={this.state.action}
          isActive={this.state.isActive}
        />
      </div>
    );
  }
});

React.render(<Example />, document.body);

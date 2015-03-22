var path = '../../web_modules/notification.js';

jest.dontMock(path);

describe('Notification', function() {

  var React = require('react/addons');
  var Utils = React.addons.TestUtils;
  var Notification = require(path);

  // Mock state for the tests
  this.state = {
    message: 'Todo added',
    action: 'Undo'
  };

  // Mock inline styles
  this.styles = {};

  // Mock event handle
  this.handleClick = function() {};

  /**
   * Create a <Notification /> component with
   * mocked props.
   */
  var Notification = Utils.renderIntoDocument(
    <Notification
      message={this.state.message}
      action={this.state.action}
      onClick={this.handleClick}
    />
  );

  it('accepts all props', function () {

    var message = Utils.findRenderedDOMComponentWithClass(Notification, 'notification-bar-message');
    expect(message.getDOMNode().textContent).toEqual(this.state.message);

    var action = Utils.findRenderedDOMComponentWithClass(Notification, 'notification-bar-action');
    expect(action.getDOMNode().textContent).toEqual(this.state.action);

  }.bind(this));

  it('hides the notification message', function() {
    Notification.hide();
  }.bind(this));

  it('show the notification message', function() {
    Notification.show();
  }.bind(this));

});

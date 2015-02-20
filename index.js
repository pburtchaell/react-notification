var React = require('react/addons');
var classes = require('react-classes');

var Notfication = React.createClass({

  mixins: [classes],

  /**
   * @function hide
   * @description Focus on the element.
   */
  open: function () {
    this.setState({
      active: true
    });
  },

  /**
   * @function hide
   * @description Focus on the element.
   */
  hide: function () {
    this.setState({
      active: false
    });
  },

  propTypes: {
    message: React.PropTypes.string,
    action: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      active: false
    };
  },

  getDefaultProps: function () {
    return {
      message: '',
      action: 'Dismiss',
      onClick: function () {
        this.hide();
      }
    };
  },

  render: function () {\

    var classes = this.getClass('notficiation-bar', {
      'notification-active': this.state.active || false
    });

    return (
      <div className={classes}>
        <div className="notfication-bar-wrapper" onClick={this.props.onClick}>
          <span className="notfication-bar-message">{this.props.message}</span>
          <span className="notification-bar-action">{this.props.action}</span>
        </div>
      </div>
    )
  }

});

module.exports = Notfication;

var React = require('react');
var objectAssign = require('object-assign');

var Notification = React.createClass({

  getBarStyles: function () {

    var styles = {};

    /**
     * If styles is set to false,
     * then return nothing.
     */
    if (this.props.styles === false) {
      return styles;
    }

    styles.active = {
      left: '1rem'
    };

    styles.default = {
      padding: '1rem',
      background: '#212121',
      color: '#FAFAFA',
      width: 'auto',
      position: 'fixed',
      left: '-100%',
      bottom: '1rem',
      boxShadow: '0 0 1px 1px rgba(10,10,11,0.125)',
      borderRadius: '5px',
      cursor: 'default',
      font: '1rem normal Roboto, sans-serif',
      transition: '.5s ease'
    };

    styles = !this.state.active ? styles.default : objectAssign(styles.default, styles.active);

    if (this.props.styles && this.props.styles.bar) {
      styles = objectAssign(styles, this.props.styles.bar);
    }

    return styles;

  },

  getActionStyles: function () {

    var styles = {};

    /**
     * If styles is set to false,
     * then return nothing.
     */
    if (this.props.styles === false) {
      return styles;
    }

    styles = {
      padding: '0.125rem',
      marginLeft: '1rem',
      color: '#f44336',
      textTransform: 'uppercase',
      letterSpacing: '.125ex',
      borderRadius: '5px',
      cursor: 'pointer',
      lineHeight: '1rem',
      font: '.75rem normal Roboto, sans-serif',
    };

    if (this.props.styles && this.props.styles.action) {
      styles = objectAssign(styles, this.props.styles.action);
    }

    return styles;

  },

  /**
   * @function show
   * @description Show the notification message.
   */
  show: function () {
    this.setState({
      active: true
    });
  },

  /**
   * @function hide
   * @description Hide the notification message.
   */
  hide: function () {
    this.setState({
      active: false
    });
  },

  handleClick: function (event) {
    event.preventDefault();
    this.props.onClick();
    this.hide();
  },

  propTypes: {
    message: React.PropTypes.string.isRequired,
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
      action: 'Dismiss',
      onClick: function () {
        return;
      }
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.dismissAfter) return;
    var self = this;
    if (this.state.timeoutId) clearTimeout( this.state.timeoutId );
    this.state.timeoutId = setTimeout( self.hide(), nextProps.dismissAfter );

    this.setState(this.state);
  },

  render: function () {
    return (
      <div className="notification-bar" style={this.getBarStyles()}>
        <div className="notification-bar-wrapper" onClick={this.handleClick}>
          <span className="notification-bar-message">{this.props.message}</span>
          <span className="notification-bar-action" style={this.getActionStyles()}>{this.props.action}</span>
        </div>
      </div>
    );
  }

});

module.exports = Notification;

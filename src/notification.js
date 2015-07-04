import React from 'react';
import objectAssign from 'object-assign';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    // Bind lexical scope of "this" to class
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // Initial state
    this.state = {
      isActive: false,
    };
  }

  static propTypes = {
    message: React.PropTypes.string.isRequired,
    action: React.PropTypes.string,
    onClick: React.PropTypes.func,
  }

  static defaultProps = {
    action: 'Dismiss',
    onClick: function () {
      return
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.dismissAfter) return;

    if (this.state.timeoutId) clearTimeout(this.state.timeoutId);
    this.state.timeoutId = setTimeout(this.hide, nextProps.dismissAfter);

    this.setState(this.state);
  },

  /**
   * @description Dynamically get the styles for the bar.
   * @returns {object} result The style.
   */
  get barStyle() {
    let result;

    let style = {
      base: {
        position: 'fixed',
        top: '6rem',
        left: '-100%',
        width: 'auto',
        padding: '1rem',
        margin: 0,
        color: '#fafafa',
        font: '1rem normal Roboto, sans-serif',
        borderRadius: '5px',
        background: '#212121',
        boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
        cursor: 'default',
        transition: '.5s ease',
      },
      active: {
        left: '1rem',
      },
    };

    /**
     * If styles is set to false, then return nothing.
     */
    if (this.props.styles === false) {
      return {};
    }

    /**
     * If `this.props.styles.active` exists (which means
     * custom active styles should be used, override the
     * default active styles with those from the prop.
     */
    if (this.props.styles.active) {
      style.active = this.props.styles.active;
    }

    /**
     * If `this.props.styles.bar` exists (which means custom
     * styles should be applied to the bar) combine those
     * styles with the existing base style.
     */
    if (this.props.styles.bar) {
      style.base = objectAssign(style.base, this.props.styles.bar);
    }

    result = !this.state.active ? style.base : objectAssign(style.base, style.active);

    return result;
  }

  /**
   * @description Dynamically get the styles for the action text.
   * @returns {object} result The style.
   */
  get actionStyle() {

    let result;

    /**
     * If styles is set to false, then return nothing.
     */
    if (this.props.styles === false) {
      return {};
    }

    let style = {
      padding: '0.125rem',
      marginLeft: '1rem',
      color: '#f44336',
      font: '.75rem normal Roboto, sans-serif',
      lineHeight: '1rem',
      letterSpacing: '.125ex',
      textTransform: 'uppercase',
      borderRadius: '5px',
      cursor: 'pointer',
    };

    if (this.props.styles && this.props.styles.action) {
      result = objectAssign(styles, this.props.styles.action);
    }

    return result;
  }

  /**
   * @function show
   * @description Show the notification message.
   */
  show() {
    this.setState({
      isActive: true
    });
  }

  /**
   * @function hide
   * @description Hide the notification message.
   */
  hide() {
    this.setState({
      isActive: false
    });
  }

  /**
   * @function handleClick
   * @description
   */
  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
    this.hide();
  },

  render() {
    return (
      <div className="notification-bar" style={this.barStyle}>
        <div className="notification-bar-wrapper" onClick={this.handleClick}>
          <span className="notification-bar-message">{this.props.message}</span>
          <span className="notification-bar-action" style={this.actionStyle}>
            {this.props.action}
          </span>
        </div>
      </div>
    );
  }

});

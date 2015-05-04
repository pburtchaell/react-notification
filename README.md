# react-notification [![npm version](https://badge.fury.io/js/react-notification.svg)](http://badge.fury.io/js/react-notification) [![Dependency Status](https://david-dm.org/pburtchaell/react-classes.svg)](https://david-dm.org/pburtchaell/react-notification)

## Overview

![](https://raw.githubusercontent.com/pburtchaell/react-notification/master/bin/example.gif)

This is a component designed to provide "[snackbar](http://www.google.com/design/spec/components/snackbars-toasts.html#snackbars-toasts-usage)" notification messages. I would suggest reading the usage guidelines for [snackbars](http://www.google.com/design/spec/components/snackbars-toasts.html#).

## Getting Started

1. First, install the component via npm: `npm install react-notification`
2. Require the component: `import Notification from 'react-notification';`

## Usage

```
<Notification
  message={string}
  action={string}
  styles={object}
  onClick={func}
/>
```

## Example

See [here](/bin/tests/test.js).

### Props

| Name      | Type            | Description                                         | Required  |
|---------  |---------------  |---------------------------------------------------  |---------- |
| message   | string          | The message for the notification                    | true      |
| action    | string          | The name of the action, e.g., "close" or "undo"     |           |
| styles    | object || bool  | Styles to apply to the component*                   |           |
| dismissAfter | integer      | Time in milliseconds to dismiss the notification (eg. `2000` for 2 seconds) |           |

*Setting this prop to `false` will disable all inline styles. This is useful if you aren't using React inline styles and would like to use CSS instead. See [styles](#styles) for more.

### Methods

| Method   | Usage                  |                          |
|--------  |----------------------  |------------------------  |
| show     | `Notification.show()`  | Opens the notification.  |
| hide     | `Notification.hide()`  | Hides the notifciation.  |


## Events

| Event     | Description                                         |
|---------  |---------------------------------------------------  |
| onClick   | Callback function to run when the action is clicked |

## Styles

This component does use basic inline CSS to style the position and visibility of the notification. You have two options for adding additional styles:

1. Remove all inline styles and use only CSS.
2. Add additional inline styles via the style prop.

The DOM tree of the component for reference:

```html
<div class="notification-bar">
  <div class="notification-bar-wrapper" onClick={this.props.onClick}>
    <span class="notification-bar-message">{this.props.message}</span>
    <span class="notification-bar-action">{this.props.action}</span>
  </div>
</div>
```

To use additional inline styles, return two objects. The `bar` object applies styles to the entire notification "snackbar" and the `action` object applies styles to the action message. Under the hood, this uses `Object.assign` to handle properly combining styles.

I would highly suggest using this method since the styles included in the component by default handle the visibility of the notification. If you remove these styles, the component won't actually show or hide itself.

```
getNotificationStyles() {

  var bar = {
    background: '#263238'
  };

  var action = {
    color: '#FFCCBC'
  };

  return { bar, action };

},

render() {
  return (
    <div>
      <Notification
        ref="notification"
        message={this.state.message}
        action={this.state.action}
        styles={this.getNotificationStyles()}
      />
    </div>
  );
}
```

---
Built with care in New Orleans by [Patrick Burtchaell](http://twitter.com/pburtchaell).

Copyright 2015 Patrick Burtchaell. Licensed MIT.

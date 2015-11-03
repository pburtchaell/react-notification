# react-notification [![npm version](https://badge.fury.io/js/react-notification.svg)](http://badge.fury.io/js/react-notification) [![Dependency Status](https://david-dm.org/pburtchaell/react-classes.svg)](https://david-dm.org/pburtchaell/react-notification) [![Build Status](https://travis-ci.org/pburtchaell/react-notification.svg)](https://travis-ci.org/pburtchaell/react-notification)

## Overview

![](https://raw.githubusercontent.com/pburtchaell/react-notification/master/examples/example.gif)

This is a component designed to provide "[snackbar](http://www.google.com/design/spec/components/snackbars-toasts.html#snackbars-toasts-usage)" notification messages. I would suggest reading the usage guidelines for [snackbars](http://www.google.com/design/spec/components/snackbars-toasts.html#).

## Getting Started

Install the component via npm: `npm install react-notification`.

If you are using the React 0.13.x or lower, you can install the previously compatible version of this component with `npm i react-notification@2.3.0 -S`. The current version only works with React 0.14.x.

Please read the [contributing guide](/CONTRUBUTING.md) if you are interested in contributing. If you are coming from version 1.0.0, there is an [upgrade guide](/UPGRADING.md) to help you make the switch. If you have questions, please feel free to create an issue on GitHub or message me (@pburtchaell) on the [Reactiflux Slack community](http://www.reactiflux.com/).

## Usage

```
<Notification
  isActive={boolean}
  message={string}
  action={string}
  onClick={myClickHander}
/>
```

### Props

| Name      | Type               | Description                                       | Required  | Default  |
|-----------|--------------------|---------------------------------------------------|---------- |----------|
| isActive  | boolean            | If true, the notification is visible              | true      | `false`  |
| message   | string             | The message for the notification                  | true      |          |
| action    | string             | The name of the action, e.g., "close" or "undo"   | true      |          |
| style     | object or boolean  | Custom styles to apply to the component*          |           |          |
| className | string             | Custom class to apply to the top-level component  |           |          |
| activeClassName | string             | Custom class to apply to the top-level component when active |           |          |
| dismissAfter | number          | Timeout for onDismiss event                       |           | `2000`   |

*Setting this prop to `false` will disable all inline styles. This is useful if you aren't using React inline styles and would like to use CSS instead. See [styles](#styles) for more.

## Events

| Event     | Description                                                |
|-----------|------------------------------------------------------------|
| onClick   | Callback function to run when the action is clicked        |
| onDismiss | Callback function to run when dismissAfter timer runs out |

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
  let bar = {
    background: '#263238'
  };

  let active = {
    left: '3rem'
  };

  let action = {
    color: '#FFCCBC'
  };

  return { bar, active, action };
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

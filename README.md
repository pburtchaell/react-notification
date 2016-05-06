# react-notification

[![npm version](https://badge.fury.io/js/react-notification.svg)](http://badge.fury.io/js/react-notification) [![Dependency Status](https://david-dm.org/pburtchaell/react-notification.svg)](https://david-dm.org/pburtchaell/react-notification) [![Build Status](https://travis-ci.org/pburtchaell/react-notification.svg)](https://travis-ci.org/pburtchaell/react-notification) [![npm downloads](https://img.shields.io/npm/dm/react-notification.svg?style=flat)](http://badge.fury.io/js/react-notification)

## Overview

![](https://raw.githubusercontent.com/pburtchaell/react-notification/master/examples/example.gif)
![](https://raw.githubusercontent.com/pburtchaell/react-notification/master/examples/stack.gif)

This is a component designed to provide "[snackbar](http://www.google.com/design/spec/components/snackbars-toasts.html#snackbars-toasts-usage)" notification messages and notification stacks (similar to how notifications stack on OS X). I would suggest reading the usage guidelines for [snackbars](http://www.google.com/design/spec/components/snackbars-toasts.html#).

## Getting Started

Install the component via npm: `npm install react-notification`.

If you are using the React 0.13.x or lower, you can install the previously compatible version of this component with `npm i react-notification@2.3.0 -S`. The current version only works with React 0.14.x.

Please read the [contributing guide](/CONTRUBUTING.md) if you are interested in contributing. If you are coming from version 1.0.0, there is an [upgrade guide](/UPGRADING.md) to help you make the switch. If you have questions, please feel free to create an issue on GitHub.

Note the component uses `Object.assign`. If you are compiling with Babel, you should include the Babel Polyfill in your build to ensure the method works.

## Usage

Single notification:

```js
import { Notification } from 'react-notification';

<Notification
  isActive={boolean}
  message={string}
  action={string}
  onClick={myClickHander}
/>
```

Notification stack:

```js
import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';

constructor () {
  super();
  this.state = {
    notifications: OrderedSet()
  };
}

addNotification () {
  const newCount = count + 1;
  return this.setState({
    notifications: this.state.notifications.add({
      message: `Notification ipsum...`,
      key: 'some UID',
      action: 'Dismiss',
      onClick: () => this.removeNotification('some UID'),
    })
  });
}

removeNotification (count) {
  this.setState({
    notifications: this.state.notifications.filter(n => n.key !== count)
  })
}

render () {
  return (
    <NotificationStack
      notifications={this.state.notifications.toArray()}
      onDismiss={notification => this.setState({
        notifications: this.state.notifications.delete(notification)
      })}
    />
  );
}
```

See the [examples](/examples/notification-tree) for more context on how to use a notification stack.

### Props

For Notification component:

| Name            | Type                    | Description                                                 | Required  | Default                    |
|-----------------|-------------------------|-------------------------------------------------------------|-----------|----------------------------|
| isActive        | boolean                 | If true, the notification is visible                        | true      | `false`                    |
| message         | string or React element | The message or component for the notification               | true      |                            |
| title           | string                  | The title for the notification                              |           |                            |
| action          | string                  | The name of the action, e.g., "close" or "undo"             |           |                            |
| style           | boolean                 | Setting this prop to `false` will disable all inline styles |           |                            |
| barStyle        | object                  | Custom snackbar styles                                      |           |                            |
| activeBarStyle  | object                  | Custom snackbar styles when the bar is active               |           |                            |
| actionStyle     | object                  | Custom action styles                                        |           |                            |
| className       | string                  | Custom class to apply to the top-level component            |           |                            |
| activeClassName | string                  | Custom class to apply to the top-level component when active|           | `'notification-bar-active'`|
| dismissAfter    | number                  | Timeout for onDismiss event                                 |           | `2000`                     |

The `style` prop useful if you are not using React inline styles and would like to use CSS instead. See [styles](#styles) for more.

For NotificationStack component:

| Name           | Type  | Description                                  | Required  | Default  |
|----------------|-------|----------------------------------------------|---------- |----------|
| notifications  | array | Array of notifications to render             | true      |          |

**Update** `v5.0.3`: Now notifications used in a stack _can_ have all properties included in the regular notification component.

## Events

For Notification component:

| Event     | Description                                                |
|-----------|------------------------------------------------------------|
| onClick   | Callback function to run when the action is clicked        |
| onDismiss | Callback function to run when dismissAfter timer runs out  |

For NotificationStack component:

| Event     | Description                                                                  | Arguments                                                 |
|-----------|------------------------------------------------------------------------------|-----------------------------------------------------------|
| onDismiss | Callback function to run when dismissAfter timer runs out for a notification | The object for the notification currently being dismissed |

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

---
Built with care in New Orleans by [Patrick Burtchaell](http://twitter.com/pburtchaell).

Copyright 2016 Patrick Burtchaell. Licensed MIT. [Gratipay](https://gratipay.com/~pburtchaell/).

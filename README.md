# react-notification [![npm version](https://badge.fury.io/js/react-notification.svg)](http://badge.fury.io/js/react-notification) [![Dependency Status](https://david-dm.org/pburtchaell/react-classes.svg)](https://david-dm.org/pburtchaell/react-notification)

## Overview

This is a component designed to provide "[snackbar](http://www.google.com/design/spec/components/snackbars-toasts.html#snackbars-toasts-usage)" notification messages.

*Warning: this is a major version zero release. The component is still under development and the API may change at any time. Please report issues and bugs [on GitHub](https://github.com/pburtchaell/react-notification/issues).*

## Getting Started

1. First, install the component via npm: `npm install react-notification`
2. Require the component: `var Notification = require('react-notification');`

## Usage

```
<Notfication
  message={string}
  action={string}
  onClick={func}
/>
```

### Props

| Name      | Type     | Description                                     |
|---------  |--------  |-----------------------------------------------  |
| message   | string   | The message for the notification                |
| action    | string   | The name of the action, e.g., "close" or "undo" |

### Methods

| Method   | Usage                  |                          |
|--------  |----------------------  |------------------------  |
| show     | `Notification.show()`  | Opens the notification.  |
| hide     | `Notification.hide()`  | Hides the notifciation.  |

## Events

| Event     | Description                               |
|---------  |-----------------------------------------  |
| onClick   | Fuction runs on change                    |

### DOM Nodes

As this component does not include CSS styles to use, you will need to add your own styles. The DOM tree of the component is included below for reference.

```html
<div class="notficiation-bar">
  <div class="notfication-bar-wrapper" onClick={this.props.onClick}>
    <span class="notfication-bar-message">{this.props.message}</span>
    <span class="notification-bar-action">{this.props.action}</span>
  </div>
</div>
```

---
Built with care in New Orleans by [Patrick Burtchaell](http://twitter.com/pburtchaell).

Copyright 2014 Patrick Burtchaell. Licensed MIT.

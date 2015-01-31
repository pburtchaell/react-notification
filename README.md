# react-notification

## Overview

This is a component designed to provide "snackbard" notification messages.

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

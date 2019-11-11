# 1.0.0 to 2.0.0

The 2.0.0 release is a component with no local state and consequently, no methods to show and hide the component. Instead, you need to use the `isActive` prop to control the visibility of the component.

Additionally, the functionality of the `dissmissAfter` prop is changed. Instead of the component dismissing the notification using local state, it will run a callback event `onDismiss` after the time specified in `dismissAfter`.

For example, if you want your notification to dismiss after two seconds:

```js
var props = {
  isActive: this.state.isNotficationActive,
  message: 'This is a notification',
  action: 'Dismiss',
  dismissAfter: 2000,
  onDismiss: this.hideMyNotification,
  onClick: this.hideMyNotification
}

<Notfication  {...props} />
```

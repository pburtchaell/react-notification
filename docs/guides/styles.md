## Styles

This component uses basic inline CSS to style the position and visibility of the notification.I would suggest reading the usage guidelines for [snackbars](http://www.google.com/design/spec/components/snackbars-toasts.html) before making any changes.

You have two options for adding additional styles:

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

### barStyleFactory and activeBarStyleFactory NotificationStack props

These two function have the following signature:

```js
(index: Number, style: Object|Void, notification: Object) => Object
```

Where `index` is the index of the notification in the notifications array,
`style` is the style property of the individual notification and `notification` is the notification itself.

This function is used to dynamically set the style of each notification in the
stack. The default function adds the `bottom` style property to correctly
position of the notification in a stack.

```js
function defaultStyleFactory(index, style, notification) {
  return Object.assign(
    {},
    style,
    { bottom: `${2 + index * 4}rem` }
  );
}
```

## Styles

By default, the component uses inline CSS styles and follows the Material Design specifications for snackbar notifications. CSS is used for the visual design of the component (color, typography and layout) and for animations.

There's to ways you can customize the styles:

1. Reset the built-in styles and use your own CSS
2. Extend the built-in styles with additional CSS

## Reset built-in styles and use your own CSS

TODO

By default, the component has an HTML structure like this:

```js
function Snackbar() {
  return (
    <div className="snackbar-notification-container">
      <div className="snackbar-notification-surface">
        <span className="snackbar-notification-text">{props.text}</span>
        <button className="snackbar-notification-button">{props.action}</button>
      </div>
    </div>
  )
}
```

To change the classnames that the component uses, provide the `classNames` prop.

```js
<Notification 
  classNames={{
    container: "my-custom-container",
    surface: "my-custom-surface",
    text: "my-custom-text",
    button: "my-custom-button"
  }}
/>
```

This will result in HTML like:

```js
function Snackbar() {
  return (
    <div className="my-custom-container">
      <div className="my-custom-surface">
        <span className="my-custom-text">{props.text}</span>
        <button className="my-custom-button">{props.action}</button>
      </div>
    </div>
  )
}
```

## Extend built-in styles with additional CSS

TODO


## Events

### For single notification component

| Event     | Description                                                |
|-----------|------------------------------------------------------------|
| onClick   | Callback function to run when the action is clicked        |
| onDismiss | Callback function to run when dismissAfter timer runs out  |

onClick is called with parameter *deactivate*, which is a function and can be called to set the notification to inactive. Used to activate notification exit animation on click.

### For notification stack component

| Event     | Description                                                                  | Arguments                                                 |
|-----------|------------------------------------------------------------------------------|-----------------------------------------------------------|
| onDismiss | Callback function to run when dismissAfter timer runs out for a notification | The object for the notification currently being dismissed |

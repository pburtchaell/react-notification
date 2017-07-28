### Props

### For single notification component

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
| titleStyle      | object                  | Custom title styles                                         |           |                            |
| className       | string                  | Custom class to apply to the top-level component            |           |                            |
| activeClassName | string                  | Custom class to apply to the top-level component when active|           | `'notification-bar-active'`|
| dismissAfter    | number or false         | Timeout for onDismiss event                                 |           | `2000`                     |

The `style` prop useful if you are not using React inline styles and would like to use CSS instead. See [styles](styles.md) for more.

### For notification stack component

| Name                  | Type  | Description                                              | Required  | Default  |
|-----------------------|-------|----------------------------------------------------------|---------- |----------|
| notifications         | array | Array of notifications to render                         | true      |          |
| dismissInOrder        | bool  | If false, notification dismiss timers start immediately  | false     | true     |
| barStyleFactory       | func  | create the style of the notification                     | false     | fn       |
| activeBarStyleFactory | func  | create the style of the active notification              | false     | fn       |
| actionStyleFactory    | func  | create the style of the actions                          | false     | fn       |

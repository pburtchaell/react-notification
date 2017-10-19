## Props

### For single notification component

| Name            | Type                    | Description                                                 | Required  | Default                    |
|-----------------|-------------------------|-------------------------------------------------------------|-----------|----------------------------|
| action          | string                  | The name of the action, e.g., "close" or "undo"             |           |                            |
| actionStyle     | object                  | Custom action styles                                        |           |                            |
| activeBarStyle  | object                  | Custom snackbar styles when the bar is active               |           |                            |
| activeClassName | string                  | Custom class to apply to the top-level component when active|           | `'notification-bar-active'`|
| barStyle        | object                  | Custom snackbar styles                                      |           |                            |
| className       | string                  | Custom class to apply to the top-level component            |           |                            |
| dismissAfter    | number or boolean       | Timeout for onDismiss event                                 |           | `2000`                     |
| isActive        | boolean                 | If true, the notification is visible                        | true      | `false`                    |
| message         | string or React element | The message or component for the notification               | true      |                            |
| style           | boolean                 | Setting this prop to `false` will disable all inline styles |           |                            |
| title           | string                  | The title for the notification                              |           |                            |
| titleStyle      | object                  | Custom title styles                                         |           |                            |

The `style` prop useful if you are not using React inline styles and would like to use CSS instead. See [styles](styles.md) for more.

### For notification stack component

| Name                  | Type    | Description                                              | Required  | Default  |
|-----------------------|---------|----------------------------------------------------------|-----------|----------|
| actionStyleFactory    | func    | Create the style of the actions                          | false     | fn       |
| activeBarStyleFactory | func    | Create the style of the active notification              | false     | fn       |
| barStyleFactory       | func    | Create the style of the notification                     | false     | fn       |
| dismissInOrder        | boolean | If false, notification dismiss timers start immediately  | false     | true     |
| notifications         | array   | Array of notifications to render                         | true      |          |

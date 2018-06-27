## Introduction

### For single notification component

```js
import { Notification } from 'react-notification';

<Notification
  isActive={boolean}
  message={string}
  action={string}
  onClick={myClickHander}
/>
```

### For notification stack component

```js
import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable'; // Optional library used for example

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
      onClick: (notification, deactivate) => {
        deactivate();
        this.removeNotification('some UID');
      },
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

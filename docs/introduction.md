## Introduction

First, install the component via npm: `npm install react-notification`.

Note the component uses `Object.assign`. If you are compiling with Babel, you should include the Babel Polyfill in your build to ensure the method works.

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

## Sponsor

**Individual**: If you like this code and you're interested in buying me a drink, I have a [Gratipay](https://gratipay.com/~pburtchaell/) (recurring) or [Venmo](https://venmo.com/pburtchaell) (one time). I greatly appreciate your support and I'm grateful to be a part of the open source and GitHub communities.

**Company**: To help cover the cost of my time spent maintaining open source software projects, I'm looking for a small sponsor. If your company is interested, [email me](mailto:patrick@pburtchaell.com) and we can chat! 


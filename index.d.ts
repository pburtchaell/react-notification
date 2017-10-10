import { Component, ReactElement } from 'react';

interface StyleFactoryFn {
  (index: number, style: object | void, notification: NotificationProps): object;
}

interface NotificationProps {
  /** The name of the action, e.g., "close" or "undo". */
  action?: string;
  /** Custom action styles. */
  actionStyle?: object;
  /** Custom snackbar styles when the bar is active. */
  activeBarStyle?: object;
  /**
   * Custom class to apply to the top-level component when active.
   * @default 'notification-bar-active'
   */
  activeClassName?: string;
  /** Custom snackbar styles. */
  barStyle?: object;
  /** Custom class to apply to the top-level component. */
  className?: string;
  /**
   * Timeout for onDismiss event.
   * @default 2000
   */
  dismissAfter?: boolean | number;
  /**
   * If true, the notification is visible.
   * @default false
   */
  isActive?: boolean;
  /** The message or component for the notification. */
  message: string | ReactElement<NotificationProps>;
  /** Setting this prop to `false` will disable all inline styles. */
  style?: boolean;
  /** The title for the notification. */
  title?: string | ReactElement<any>;
  /** Custom title styles. */
  titleStyle?: object;
  /**
   * Callback function to run when the action is clicked.
   * @param notification  Notification currently being clicked
   * @param deactivate    Function that can be called to set the notification to inactive.
   *                      Used to activate notification exit animation on click.
   */
  onClick?(notification: NotificationProps, deactivate: () => void): void;
  /**
   * Callback function to run when dismissAfter timer runs out
   * @param notification  Notification currently being dismissed.
   */
  onDismiss?(notification: NotificationProps): void;
}

interface NotificationStackProps {
  /** Create the style of the actions. */
  actionStyleFactory?: StyleFactoryFn;
  /** Create the style of the active notification. */
  activeBarStyleFactory?: StyleFactoryFn;
  /** Create the style of the notification. */
  barStyleFactory?: StyleFactoryFn;
  /**
   * If false, notification dismiss timers start immediately.
   * @default true
   */
  dismissInOrder?: boolean;
  /** Array of notifications to render. */
  notifications: NotificationObject[];
  /**
   * Callback function to run when dismissAfter timer runs out
   * @param notification  Notification currently being dismissed.
   */
  onDismiss?(notification: NotificationObject): void;
}

export interface NotificationObject extends NotificationProps {
  key: number | string;
}

export class Notification extends Component<NotificationProps, {}> {}

export class NotificationStack extends Component<NotificationStackProps, {}> {}

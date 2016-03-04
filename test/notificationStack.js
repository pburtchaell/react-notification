import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'mocha-jsdom';
import expect from 'expect';
import { Notification, NotificationStack } from '../src/index';
import mockNotification from './mockNotification';

describe('NotificationStack', () => {
  jsdom();

  it('should be a valid element', done => {
    const component = (
      <NotificationStack
        notifications={[mockNotification]}
        onDismiss={mockNotification.onClick}
      />
    );

    if (TestUtils.isElement(component)) done();
  });

});

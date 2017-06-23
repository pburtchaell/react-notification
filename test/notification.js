import React from 'react';
import sinon from 'sinon';
import { Notification } from '../src/index';
import mockNotification from './mockNotification';

describe('<Notification />', () => {
  const messageClassName = '.notification-bar-message';
  const actionClassName = '.notification-bar-action';
  const titleClassName = '.notification-bar-title';

  const customClassName = 'foo';
  const customActiveClassName = 'bar';

  const component = shallow(
    <Notification
      message={mockNotification.message}
      action={mockNotification.action}
      barStyle={mockNotification.barStyle}
      actionStyle={mockNotification.actionStyle}
      activeBarStyle={mockNotification.activeBarStyle}
      onClick={mockNotification.onClick}
      dismissAfter={mockNotification.dismissAfter}
      title={mockNotification.title}
    />
  );

  const wrapper = component.find('.notification-bar-wrapper');
  const message = wrapper.find(messageClassName);
  const action = wrapper.find(actionClassName);
  const title = wrapper.find(titleClassName);

  describe('title as React.PropTypes.node', () => {
    before(() => {
      // Since react will console.error propType warnings,
      // we stub console.error to raise an error
      // so the test runner will pick it up.
      sinon.stub(console, 'error').callsFake((warning) => {
        throw new Error(warning);
      });
    });

    after(() => {
      /* eslint-disable no-console */
      console.error.restore();
      /* eslint-enable no-console */
    });

    it('renders without error', () => {
      const icon = <i aria-hidden="true" className="warning" />;
      shallow(
        <Notification
          message={mockNotification.message}
          action={mockNotification.action}
          barStyle={mockNotification.barStyle}
          actionStyle={mockNotification.actionStyle}
          activeBarStyle={mockNotification.activeBarStyle}
          onClick={mockNotification.onClick}
          dismissAfter={mockNotification.dismissAfter}
          title={icon}
        />
      );
    });
  });

  it('has the className `notification-bar`', () => {
    expect(component).to.have.className('notification-bar');
  });

  it('has custom class name', () => {
    // eslint-disable-next-line
    let classNameComponent = shallow(
      <Notification
        message={mockNotification.message}
        action={mockNotification.action}
        barStyle={mockNotification.barStyle}
        actionStyle={mockNotification.actionStyle}
        activeBarStyle={mockNotification.activeBarStyle}
        onClick={mockNotification.onClick}
        dismissAfter={mockNotification.dismissAfter}
        title={mockNotification.title}
        className={customClassName}
      />
    );

    expect(classNameComponent).to.have.className(customClassName);
  });

  it('has custom active class name', () => {
    // eslint-disable-next-line
    let classNameComponent = shallow(
      <Notification
        message={mockNotification.message}
        action={mockNotification.action}
        barStyle={mockNotification.barStyle}
        actionStyle={mockNotification.actionStyle}
        activeBarStyle={mockNotification.activeBarStyle}
        onClick={mockNotification.onClick}
        dismissAfter={mockNotification.dismissAfter}
        title={mockNotification.title}
        className={customClassName}
        activeClassName={customActiveClassName}
      />
    );

    expect(classNameComponent).to.have.className(customClassName);

    classNameComponent.setProps({ isActive: true });

    expect(classNameComponent).to.have.className(customActiveClassName);
  });

  it('should render message element', () => {
    expect(wrapper).to.have.descendants(messageClassName);
  });

  it('should render action element by default', () => {
    expect(wrapper).to.have.descendants(actionClassName);
  });

  it('should render message text', () => {
    expect(message).to.have.text(mockNotification.message);
  });

  it('should render message element', () => {
    const element = (<div />);

    // eslint-disable-next-line
    let message = shallow(
      <Notification
        message={element}
        action={mockNotification.action}
        barStyle={mockNotification.barStyle}
        actionStyle={mockNotification.actionStyle}
        activeBarStyle={mockNotification.activeBarStyle}
        onClick={mockNotification.onClick}
        dismissAfter={mockNotification.dismissAfter}
      />
    ).find(messageClassName);

    expect(message.contains(element)).to.equal(true);
  });

  it('should render custom action text', () => {
    expect(action).to.have.text(mockNotification.action);
  });

  it('should render title element', () => {
    expect(wrapper).to.have.descendants(titleClassName);
  });

  it('should render custom title text', () => {
    expect(title).to.have.text(mockNotification.title);
  });

  it('should use custom bar styles', () => {
    expect(component).to.have.style('background', 'rgb(2, 2, 2)');
  });

  it('should use custom action styles', () => {
    expect(action).to.have.style('color', 'rgb(2, 2, 2)');
  });

  it('should use custom active styles', () => {
    // eslint-disable-next-line
    let component = shallow(
      <Notification
        isActive={true}
        message={mockNotification.message}
        action={mockNotification.action}
        barStyle={mockNotification.barStyle}
        actionStyle={mockNotification.actionStyle}
        activeBarStyle={mockNotification.activeBarStyle}
        onClick={mockNotification.onClick}
        dismissAfter={mockNotification.dismissAfter}
      />
    );

    expect(component).to.have.style('left', '4rem');
  });

  it('onClick fires once when action is clicked', () => {
    const handleClick = spy();

    // eslint-disable-next-line
    let action = shallow(
      <Notification
        message={mockNotification.message}
        action={mockNotification.action}
        barStyle={mockNotification.barStyle}
        actionStyle={mockNotification.actionStyle}
        activeBarStyle={mockNotification.activeBarStyle}
        onClick={handleClick}
        dismissAfter={mockNotification.dismissAfter}
      />
    ).find(actionClassName);

    action.simulate('click');

    expect(handleClick.calledOnce).to.equal(true);
  });

  it('onDismiss does not fire before `dismissAfter` value times out', (done) => {
    const handleDismiss = spy();

    // eslint-disable-next-line
    let wrapper = mount(
      <Notification
        message={mockNotification.message}
        dismissAfter={mockNotification.dismissAfter}
        onDismiss={handleDismiss}
      />
    );

    expect(handleDismiss.calledOnce).to.equal(false);
    wrapper.setProps({ isActive: true });
    setTimeout(() => {
      try {
        expect(handleDismiss.calledOnce).to.equal(false);
        done();
      } catch (e) {
        done(e);
      }
    }, mockNotification.dismissAfter / 2);
  });

  it('onDismiss fires after `dismissAfter` value times out', (done) => {
    const handleDismiss = spy();

    // eslint-disable-next-line
    let wrapper = mount(
      <Notification
        message={mockNotification.message}
        dismissAfter={mockNotification.dismissAfter}
        onDismiss={handleDismiss}
      />
    );

    wrapper.setProps({ isActive: true });
    setTimeout(() => {
      try {
        expect(handleDismiss.calledOnce).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    }, mockNotification.dismissAfter);
  });

  it('onDismiss fires once when dismissAfter is passed', (done) => {
    const handleDismiss = spy();

    // eslint-disable-next-line
    let wrapper = mount(
      <Notification
        message={mockNotification.message}
        dismissAfter={mockNotification.dismissAfter}
        onDismiss={handleDismiss}
      />
    );

    wrapper.setProps({ isActive: true });

    setTimeout(() => {
      try {
        expect(handleDismiss.calledOnce).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    }, mockNotification.dismissAfter);
  });

  it('onDismiss does not fire when dismissAfter is false', () => {
    const handleDismiss = spy();

    // eslint-disable-next-line
    let wrapper = shallow(
      <Notification
        message={mockNotification.message}
        dismissAfter={false}
        onDismiss={handleDismiss}
      />
    );

    expect(handleDismiss.calledOnce).to.equal(false);
  });
});

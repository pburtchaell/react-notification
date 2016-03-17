import { Notification, NotificationStack } from '../src/index';
import mockNotification from './mockNotification';

describe('<Notification />', () => {
  const wrapperClassName = '.notification-bar-wrapper';
  const messageClassName = '.notification-bar-message';
  const actionClassName = '.notification-bar-action';

  let component = shallow(
    <Notification
      message={mockNotification.message}
      action={mockNotification.action}
      barStyle={mockNotification.barStyle}
      actionStyle={mockNotification.actionStyle}
      activeBarStyle={mockNotification.activeBarStyle}
      onClick={mockNotification.onClick}
      dismissAfter={mockNotification.dismissAfter}
    />
  );

  const wrapper = component.find('.notification-bar-wrapper');
  const message = wrapper.find(messageClassName);
  const action = wrapper.find(actionClassName);

  it('has the className `notification-bar`', () => {
    expect(component).to.have.className('notification-bar');
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
    let element = (<div></div>);

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

  it('should use custom bar styles', () => {
    expect(component).to.have.style('background', 'rgb(2, 2, 2)');
  });

  it('should use custom action styles', () => {
    expect(action).to.have.style('color', 'rgb(2, 2, 2)');
  });

  it('should use custom active styles', () => {
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

    const action = shallow(
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
});

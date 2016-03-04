export default {
  key: 1111111,
  message: 'Test',
  action: 'Dismiss',
  dismissAfter: 3000,
  onClick: function handleClick() {
    return;
  },
  style: {
    bar: {
      background: 'rgb(2, 2, 2)'
    },
    action: {
      color: 'rgb(2, 2, 2)'
    },
    active: {
      left: '2rem'
    }
  }
};

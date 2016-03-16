import { PropTypes } from 'react';

export default {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  onClick: PropTypes.func,
  style: PropTypes.bool,
  actionStyle: PropTypes.object,
  barStyle: PropTypes.object,
  activeBarStyle: PropTypes.object,
  dismissAfter: PropTypes.number,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
  activeClassName: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

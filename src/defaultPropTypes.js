import { PropTypes } from 'react';

export default {
  message: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  onClick: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  dismissAfter: PropTypes.number,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  isActive: PropTypes.bool
};

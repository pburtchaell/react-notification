import PropTypes from 'prop-types';

export default {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  style: PropTypes.bool,
  actionStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  barStyle: PropTypes.object,
  activeBarStyle: PropTypes.object,
  dismissAfter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  onDismiss: PropTypes.func,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  isActive: PropTypes.bool,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};

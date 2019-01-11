import PropTypes from 'prop-types';

export const itemType = PropTypes.shape({
  icon: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    sprite: PropTypes.string.isRequired,
  }),
  id: PropTypes.string.isRequired,
  isHeader: PropTypes.bool,
  label: PropTypes.string.isRequired,
  meta: PropTypes.node,
});

export const itemTypeEntity = PropTypes.shape({
  icon: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    sprite: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  isHeader: PropTypes.bool,
  label: PropTypes.string.isRequired,
  meta: PropTypes.node.isRequired,
});

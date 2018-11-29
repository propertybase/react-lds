import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { applyDecorators, decoratorProp } from '../../utils';

const Table = (props) => {
  const {
    children,
    className,
    flavor,
    stickyHeader,
    variation,
    ...rest
  } = props;

  const sldsClasses = [
    'slds-table',
    'slds-table_cell-buffer',
    className,
    applyDecorators(flavor, 'table'),
    applyDecorators(variation),
  ];

  return (<table {...rest} className={cx(sldsClasses)}>{children}</table>);
};

// https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types#is-it-safe
export const propTypes = {
  /**
   * table content
   */
  children: PropTypes.node,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * flavor: array of flavors, you can also provide a single flavor string.
   * Flavors: bordered, col-bordered, striped, fixed-layout
   */
  flavor: decoratorProp([
    'bordered',
    'col-bordered',
    'striped',
    'fixed-layout',
    'header-hidden',
  ]),
  /**
   * Make table header stick to the top
   */
  stickyHeader: PropTypes.bool,
  /**
   * variation: array of variations, you can also provide a single variation string.
   * Variations: no-row-hover, max-medium-table_stacked,
   max-medium-table_stacked-horizontal
   */
  variation: decoratorProp([
    'no-row-hover',
    'max-medium-table_stacked',
    'max-medium-table_stacked-horizontal',
  ]),
};

Table.defaultProps = {
  children: null,
  className: null,
  flavor: [],
  stickyHeader: false,
  variation: [],
};

Table.propTypes = propTypes;

export default Table;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'lodash.omit';
import { applyDecorators, decoratorProp } from '../../utils';

const validBreakpoints = [
  'small',
  'medium',
  'large',
  'max-small',
  'max-medium',
  'max-large',
];

const breakPointProp = breakpoint => `${breakpoint}-sizeOf`;
const sizeRegex = /^([1-9]|1[0-2])-([1-9]|1[0-2])$/;

const Column = (props) => {
  const { align, children, className, flavor, variation, omitCol, ...rest } = props;

  const sldsClasses = [
    { 'slds-col': !omitCol },
    { [`slds-align-${align}`]: !!align },
    className,
    applyDecorators(flavor, 'col'),
    applyDecorators(variation),
  ];

  const breakpoints = Array.from(validBreakpoints);
  breakpoints.unshift('');

  breakpoints.forEach((breakpoint) => {
    const propName = breakpoint === '' ? 'sizeOf' : breakPointProp(breakpoint);
    const sizeString = breakpoint === '' ? 'size' : `${breakpoint}-size`;

    const size = props[propName];
    if (sizeRegex.test(size)) {
      const from = parseInt(size.split('-')[0], 10);
      const to = parseInt(size.split('-')[1], 10);
      sldsClasses.push(`slds-${sizeString}_${from}-of-${to}`);
    }
  });

  const restProps = omit(rest, validBreakpoints.map(breakPointProp), 'sizeOf');

  return (
    <div {...restProps} className={cx(sldsClasses)}>{children}</div>
  );
};

const sizeOfPropType = (props, propName) => {
  const size = props[propName];

  if (size && typeof size !== 'string') {
    return new Error(`${propName} must be a string`);
  }

  if (typeof size === 'string' && !sizeRegex.test(size)) {
    return new Error(`${propName} must be of format {1-12}-{1-12}`);
  }

  if (sizeRegex.test(size)) {
    const from = parseInt(size.split('-')[0], 10);
    const to = parseInt(size.split('-')[1], 10);

    if (from > to) {
      return new Error(`${propName} ${size} is impossible. \`${from}\` needs to be smaller than \`${to}\``);
    }
  }

  return null;
};

Column.defaultProps = {
  align: null,
  className: null,
  flavor: [],
  variation: [],
  omitCol: false,
};

Column.propTypes = {
  /**
   * alignment of columns on the main axis
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  /**
   * column content
   */
  children: PropTypes.node.isRequired,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * flavor: string or array of strings. Flavors: bump-left, bump-right,
   * bump-top, bump-bottom, padded, padded-large, padded-small, rule-right,
   * rule-left, rule-top, rule-bottom,
   */
  flavor: decoratorProp([
    'bump-left',
    'bump-right',
    'bump-top',
    'bump-bottom',
    'padded',
    'padded-large',
    'padded-small',
    'rule-right',
    'rule-left',
    'rule-top',
    'rule-bottom',
  ]),
  /*
   * variation: string or array of strings. Variations: has-flexi-truncate,
   * no-flex, no-space, grow, grow-none, shrink, shrink-none
   */
  variation: decoratorProp([
    'has-flexi-truncate',
    'no-flex',
    'no-space',
    'grow',
    'grow-none',
    'shrink',
    'shrink-none',
  ]),
  /**
   * non-responsive sizeOf
   */
  sizeOf: sizeOfPropType, // eslint-disable-line react/require-default-props
  /**
   * omit 'slds-col'
   */
  omitCol: PropTypes.bool,
  ...validBreakpoints.reduce((_propTypes, breakpoint) => {
    const propTypes = _propTypes;
    propTypes[breakPointProp(breakpoint)] = sizeOfPropType;
    return propTypes;
  }, {}),
};

export default Column;

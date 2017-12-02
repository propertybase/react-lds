import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { flavorProp } from '../../utils';

const Grid = (props) => {
  const { children, className, flavor, wrap, ...rest } = props;

  const flavorClasses = Array.isArray(flavor) ? flavor.map(f => `slds-grid_${f}`) : `slds-grid_${flavor}`;

  const sldsClasses = [
    'slds-grid',
    className,
    flavorClasses,
    { 'slds-wrap': !!wrap }
  ];

  return (<div {...rest} className={cx(sldsClasses)}>{children}</div>);
};

Grid.defaultProps = {
  children: null,
  className: null,
  flavor: [],
  wrap: null
};

Grid.propTypes = {
  /**
   * grid content
   */
  children: PropTypes.node,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * flavor: string or array of strings. Flavors: frame, vertical, reverse,
   * vertical-reverse, align-center, align-spread, align-space, align-end,
   * vertical-align-center, certical-align-end, vertical-stretch, pull-padded,
   * pull-padded-medium, pull-padded-large,
   */
  flavor: flavorProp([
    'frame',
    'vertical',
    'reverse',
    'vertical-reverse',
    'align-center',
    'align-spread',
    'align-space',
    'align-end',
    'vertical-align-center',
    'certical-align-end',
    'vertical-stretch',
    'pull-padded',
    'pull-padded-medium',
    'pull-padded-large',
  ]),
  /*
   * wrap variation
   */
  wrap: PropTypes.bool,
};

export default Grid;

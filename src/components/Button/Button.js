import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { applyDecorators, decoratorProp } from '../../utils';

const Button = (props) => {
  const {
    children,
    className,
    disabled,
    onClick,
    selected,
    size,
    title,
    tooltip,
    value,
    flavor,
    ...rest
  } = props;

  const sldsClasses = [
    'slds-button',
    { 'slds-is-selected': !!selected },
    { [`slds-button_${size}`]: !!size },
    applyDecorators(flavor, 'button'),
    className,
  ];

  return (
    <button
      {...rest}
      className={cx(sldsClasses)}
      onClick={onClick}
      disabled={disabled}
      value={value}
      title={tooltip || title}
    >
      {(children && children.props && children.props.position === 'right') ? title : null}
      {!children ? title : children}
      {(children && children.props && children.props.position === 'left') ? title : null}
    </button>
  );
};

Button.defaultProps = {
  children: null,
  className: null,
  disabled: false,
  selected: false,
  size: null,
  title: null,
  tooltip: null,
  value: null,
  flavor: [],
};

Button.propTypes = {
  /**
   * button content
   */
  children: PropTypes.node,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * disables the button
   */
  disabled: PropTypes.bool,
  /**
   * onClick handler to trigger an action
   */
  onClick: PropTypes.func.isRequired,
  /**
   * renders as selected
   */
  selected: PropTypes.bool,
  /**
   * button title
   */
  title: PropTypes.string,
  /**
   * Button size, may not have any effect
   */
  size: PropTypes.oneOf(['x-small', 'small', 'large']),
  /**
   * button tooltip
   */
  tooltip: PropTypes.string,
  /**
   * adds optional value tag to the button
   */
  value: PropTypes.string,
  /**
   * Button flavor: array of flavors, you can also provide a single flavor string. Flavors: neutral,
   brand, destructive, icon, icon-border-filled, icon-container, icon-inverse,
   icon-border, icon-bare, icon-x-small, reset, success, x-small, small, large
   */
  flavor: decoratorProp([
    'neutral',
    'brand',
    'destructive',
    'icon',
    'icon-border-filled',
    'icon-container',
    'icon-inverse',
    'icon-border',
    'icon-bare',
    'icon-x-small',
    'reset',
    'success'
  ]),
};

export default Button;

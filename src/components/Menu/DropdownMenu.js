import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import omit from 'lodash.omit';

import { Button, ButtonIcon } from '../../';

export class DropdownMenu extends Component {
  static defaultProps = {
    button: null,
    className: null,
    customButton: null,
    disabled: false,
    isOpen: false,
    last: false,
    nubbin: false,
    position: 'top-left',
    size: 'small',
  };

  static propTypes = {
    /**
     * The button that triggers the dropdown menu
     * ```
     * {
     *    icon: 'settings',
     *    sprite: 'utility',
     *    title: 'Click me',
     *    noBorder: true,
     * }
     * ```
     */
    button: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      sprite: PropTypes.string.isRequired,
      title: PropTypes.string,
      noBorder: PropTypes.bool,
      neutral: PropTypes.bool,
      brand: PropTypes.bool,
    }),
    /**
     * one DropdownMenuList or many of them
     */
    children: PropTypes.node.isRequired,
    /**
     * class name
     */
    className: PropTypes.string,
    /**
     * fully customizable dropdown trigger button, use this instead of the button
     * shape if needed
     */
    customButton: PropTypes.element,
    /**
     * adds disabled attribute to menu button
     */
    disabled: PropTypes.bool,
    /**
     * forces open or closed state, is needed when using a custom button
     */
    isOpen: PropTypes.bool,
    /**
     * indicates that this is the last element inside a button group and renders
     * the required css class
     */
    last: PropTypes.bool,
    /**
     * displays the nubbin at the correct position if true, hidden per default
     */
    nubbin: PropTypes.bool,
    /**
     * position relative to the menu button
     */
    position: PropTypes.oneOf(['top-left', 'top', 'top-right', 'bottom-left', 'bototm', 'bottom-right']),
    /**
     * length of the menu box
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };

  constructor(props, { cssPrefix }) {
    super(props, { cssPrefix });
    this.state = { open: this.props.isOpen };
  }

  getClasses() {
    if (!this.props.isOpen && !this.state.open) {
      return this.classes;
    }

    return [...this.classes, 'slds-is-open'];
  }

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  handleClickOutside() {
    this.setState({ open: false });
  }

  button = () => {
    const { button, customButton, disabled } = this.props;

    if (button) {
      const noBorder = button.noBorder;
      const title = button.title;
      return (
        <Button
          aria-haspopup="true"
          brand={button.brand}
          disabled={disabled}
          icon-border-filled={!noBorder && !title}
          icon-container={noBorder && !title}
          neutral={button.neutral}
          onClick={this.toggle}
          title={button.title}
        >
          <ButtonIcon
            icon={button.icon}
            position={title ? 'right' : undefined}
            sprite={button.sprite}
          />
        </Button>
      );
    }

    return customButton;
  }

  render() {
    const { children, className, last, position, nubbin, size } = this.props;

    this.classes = [
      'slds-dropdown-trigger',
      'slds-dropdown-trigger--click',
      { 'slds-button--last': last },
    ];

    this.dropdownClasses = [
      'slds-dropdown',
      { [`slds-dropdown--${size}`]: size },
      { 'slds-dropdown--left': position.endsWith('left') },
      { 'slds-dropdown--right': position.endsWith('right') },
      { 'slds-dropdown--bottom': position.startsWith('bottom') },
      { [`slds-nubbin--${position}`]: nubbin },
      className,
    ];

    const rest = omit(this.props, Object.keys(DropdownMenu.propTypes));

    return (
      <div className={cx(this.getClasses())}>
        {this.button()}
        <div {...rest} className={cx(this.dropdownClasses)}>
          {children}
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(DropdownMenu);

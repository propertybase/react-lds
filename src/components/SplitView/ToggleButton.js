import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { IconSVG } from '../Icon';

export const TOGGLE_BUTTON_WIDTH = '0.75rem';
const NO_SHADOW = { boxShadow: 'none' };

export const ToggleButton = ({
  ariaControls,
  assistiveTextOpen,
  assistiveTextClose,
  isOpen,
  onClick,
}) => {
  const assistiveText = isOpen
    ? assistiveTextOpen
    : assistiveTextClose;
  const buttonClassName = cx(
    'slds-button slds-button_icon slds-split-view__toggle-button',
    { 'slds-is-open': isOpen },
  );

  return (
    <button
      aria-controls={ariaControls}
      aria-expanded={isOpen}
      className={buttonClassName}
      onClick={onClick}
      style={NO_SHADOW}
      title={assistiveText}
      type="button"
    >
      <IconSVG
        className="slds-button__icon slds-button__icon_x-small"
        /* SLDS applies rotate tranform to this icon,
           so we don't need to change icon itself
         */
        icon="left"
        isButton
        sprite="utility"
      />
      <span className="slds-assistive-text">{assistiveText}</span>
    </button>
  );
};

ToggleButton.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  assistiveTextOpen: PropTypes.string.isRequired,
  assistiveTextClose: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

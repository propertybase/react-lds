import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  FormElement,
  FormElementControl,
  FormElementLabel,
} from '../../Form';

const ComboboxDropdown = React.forwardRef((props, ref) => {
  const {
    children,
    comboboxClassName,
    height,
    id,
    isSingleInlineSelection,
    label,
    listboxId,
    isOpen,
    renderInput,
    ...rest
  } = props;

  const comboboxContainerClasses = [
    'slds-combobox_container',
    { 'slds-has-selection': isSingleInlineSelection },
  ];

  const comboboxClasses = [
    'slds-combobox',
    'slds-dropdown-trigger',
    'slds-dropdown-trigger_click',
    { 'slds-is-open': isOpen },
    comboboxClassName
  ];

  const comboboxFormElementClasses = [
    'slds-combobox__form-element',
    'slds-input-has-icon',
    { 'slds-input-has-icon_left-right': isSingleInlineSelection },
    { 'slds-input-has-icon_right': !isSingleInlineSelection }
  ];

  const dropdownClasses = [
    'slds-dropdown',
    'slds-dropdown_fluid',
    { [`slds-dropdown_length-with-icon-${height}`]: height },
  ];

  return (
    <FormElement {...rest}>
      <FormElementLabel id={id} label={label} />
      <FormElementControl>
        <div className={cx(comboboxContainerClasses)}>
          <div
            className={cx(comboboxClasses)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            role="combobox"
          >
            <div className={cx(comboboxFormElementClasses)} role="none">
              {renderInput()}
            </div>
            <div
              className={cx(dropdownClasses)}
              id={listboxId}
              ref={ref}
              role="listbox"
            >
              {children}
            </div>
          </div>
        </div>
      </FormElementControl>
    </FormElement>
  );
});

ComboboxDropdown.displayName = 'ComboboxDropdown';

ComboboxDropdown.propTypes = {
  children: PropTypes.node,
  comboboxClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isSingleInlineSelection: PropTypes.bool,
  label: PropTypes.string.isRequired,
  listboxId: PropTypes.string.isRequired,
  renderInput: PropTypes.func.isRequired,
};

ComboboxDropdown.defaultProps = {
  children: null,
  comboboxClassName: null,
  isSingleInlineSelection: false,
};

export default ComboboxDropdown;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  FormElement,
  FormElementError,
  FormElementControl,
  FormElementLabel,
} from '../../';

class PicklistDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { open: this.props.open };
  }

  toggle = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  handleClickOutside() {
    this.setState({ open: false });
  }

  render() {
    const {
      children,
      error,
      hideLabel,
      id,
      input,
      open,
      labelInput,
      isRequired,
      size,
    } = this.props;

    this.comboboxContainerClasses = [
      'slds-combobox_container',
      { [`slds-size_${size}`]: !!size },
    ];

    this.comboboxClasses = [
      'slds-combobox',
      'slds-dropdown-trigger',
      'slds-combobox-picklist',
      'slds-dropdown-trigger_click',
      { 'slds-is-open': !!open },
    ];

    this.comboboxFormElementClasses = [
      'slds-combobox__form-element',
      'slds-input-has-icon',
      'slds-input-has-icon_right',
    ];

    return (
      <FormElement required={isRequired} error={error}>
        <FormElementLabel
          hideLabel={hideLabel}
          id={id}
          label={labelInput}
          required={isRequired}
        />
        <FormElementControl>
          <div className={cx(this.comboboxContainerClasses)}>
            <div
              aria-expanded={open}
              aria-haspopup
              className={cx(this.comboboxClasses)}
              role="combobox"
            >
              <div className={cx(this.comboboxFormElementClasses)}>
                {input}
                {children}
              </div>
            </div>
          </div>
        </FormElementControl>
        <FormElementError error={error} id={`error-${id}`} />
      </FormElement>
    );
  }
}

PicklistDropdown.propTypes = {
  /**
   * one PicklistDropdownList or many of them
   */
  children: PropTypes.node.isRequired,
  /**
  * input error
  */
  error: PropTypes.string,
  /**
  * indicates if the label for the input is hidden
  */
  hideLabel: PropTypes.bool,
  /**
  * id of the input
  */
  id: PropTypes.string.isRequired,
  /**
   * input field
   */
  input: PropTypes.element.isRequired,
  /**
   * forces open or closed state, is needed when using a custom button
   */
  open: PropTypes.bool,
  /**
   * label for the input
   */
  labelInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /**
   * indicates if the input is required
   */
  isRequired: PropTypes.bool,
  /**
   * Picklist sizes: small, medium, large
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

PicklistDropdown.defaultProps = {
  disabled: false,
  error: null,
  hideLabel: false,
  isRequired: false,
  labelInput: '',
  open: false,
  size: 'medium',
};

export default PicklistDropdown;

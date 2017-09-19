import React from 'react';
import PropTypes from 'prop-types';

import {
  FormElement,
  FormElementControl,
  FormElementLabel,
  FormElementError,
  InputRaw,
} from '../../';

const Input = (props) => {
  const {
    error,
    errorIcon,
    hideLabel,
    iconLeft,
    iconRight,
    id,
    label,
    required,
    showSpinner,
    fieldLevelHelp,
    ...rest,
  } = props;

  const hasIconLeft = !!iconLeft || (error && errorIcon);
  const hasIconRight = !!iconRight || !!showSpinner;

  return (
    <FormElement required={required} error={error}>
      <FormElementLabel
        hideLabel={hideLabel}
        id={id}
        label={label}
        required={required}
      />
      {fieldLevelHelp}
      <FormElementControl hasIconLeft={hasIconLeft} hasIconRight={hasIconRight}>
        <InputRaw
          error={error}
          errorIcon={errorIcon}
          iconLeft={iconLeft}
          iconRight={iconRight}
          id={id}
          label={label}
          required={required}
          showSpinner={showSpinner}
          {...rest}
        />
      </FormElementControl>
      <FormElementError error={error} id={id} />
    </FormElement>
  );
};

Input.defaultProps = {
  bare: false,
  className: null,
  disabled: false,
  error: null,
  errorIcon: false,
  hideLabel: false,
  iconLeft: null,
  iconRight: null,
  iconRightOnClick: () => {},
  isFocused: false,
  label: null,
  onChange: () => {},
  onFocus: () => {},
  onKeyPress: () => {},
  placeholder: null,
  role: null,
  required: false,
  showSpinner: false,
  type: 'text',
  value: undefined,
  fieldLevelHelp: null,
};

Input.propTypes = {
  /**
   * renders a bare input
   */
  bare: PropTypes.bool,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * adds disabled attribute to the input field
   */
  disabled: PropTypes.bool,
  /**
   * renders an error for the input
   */
  error: PropTypes.string,
  /**
   * renders an additional error icon if an error is set
   */
  errorIcon: PropTypes.bool,
  /**
   * sets the label to render as assistive text
   */
  hideLabel: PropTypes.bool,
  /**
   * icon rendered on the left side of the input (from utility sprite)
   */
  iconLeft: PropTypes.string,
  /**
   * icon rendered on the right side of the input (from utility sprite)
   */
  iconRight: PropTypes.string,
  /**
   * onClick handler for the right icon
   */
  iconRightOnClick: PropTypes.func,
  /**
   * id of the input field
   */
  id: PropTypes.string.isRequired,
  /**
   * focuses the input field
   */
  isFocused: PropTypes.bool,
  /**
   * label for the input
   */
  label: PropTypes.string,
  /**
   * onChange handler for input
   */
  onChange: PropTypes.func,
  /**
   * onFocus handler for input
   */
  onFocus: PropTypes.func,
  /**
   * onKeyPress handler
   */
  onKeyPress: PropTypes.func,
  /**
   * placeholder for the input
   */
  placeholder: PropTypes.string,
  /**
   * adds required attribute to input and label
   */
  required: PropTypes.bool,
  /**
   * role of the input field
   */
  role: PropTypes.string,
  /**
   * whether to show a spinner element inside the field, on the right end
   */
  showSpinner: PropTypes.bool,
  /**
   * input type. all HTML5 types are allowed, defaults to "text"
   * text, password, datetime, datetime-local, date, month, time, week, number, email, url, search, tel, and color
   */
  type: PropTypes.string,
  /**
   * value of the input field
   */
  value: PropTypes.string,
  /**
   * FieldLevelHelp (small info icon next to Label), if not given, it's not rendered
   */
  fieldLevelHelp: PropTypes.node,
};

export default Input;

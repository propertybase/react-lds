import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getUniqueHash } from '../../utils';

import FormElement from './FormElement';
import FormElementControl from './FormElementControl';
import FormElementError from './FormElementError';
import FormElementLabel from './FormElementLabel';

const Select = (props) => {
  const {
    children,
    className,
    disabled,
    error,
    hideErrorMessage,
    hideLabel,
    id,
    label,
    multiple,
    onChange,
    required,
    ...rest
  } = props;

  const sldsClasses = [
    'slds-select',
    className,
  ];

  const renderSelect = () => {
    const select = (
      <select
        {...rest}
        id={id}
        className={cx(sldsClasses)}
        onChange={onChange}
        multiple={multiple}
        required={required}
        disabled={disabled}
        aria-describedby={error && !hideErrorMessage ? getUniqueHash(error, id) : null}
      >
        {children}
      </select>
    );

    if (multiple) {
      return select;
    }

    return (<div className="slds-select_container">{select}</div>);
  };

  return (
    <FormElement required={required} error={error}>
      <FormElementLabel label={label} id={id} hideLabel={hideLabel} required={required} />
      <FormElementControl>
        {renderSelect()}
      </FormElementControl>
      {!hideErrorMessage && <FormElementError error={error} id={id} />}
    </FormElement>
  );
};

Select.defaultProps = {
  className: null,
  disabled: false,
  error: null,
  hideErrorMessage: false,
  hideLabel: false,
  multiple: false,
  onChange: () => {},
  required: false,
};

Select.propTypes = {
  /**
   * options & optgroups of the select
   */
  children: PropTypes.node.isRequired,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * adds disabled attribute to the select
   */
  disabled: PropTypes.bool,
  /**
  * renders an error for the select
   */
  error: PropTypes.string,
  /**
   * hides the error message
   */
  hideErrorMessage: PropTypes.bool,
  /**
   * sets the label to render as assistive text
   */
  hideLabel: PropTypes.bool,
  /**
   * id of the select
   */
  id: PropTypes.string.isRequired,
  /**
   * label for the select
   */
  label: PropTypes.node.isRequired,
  /**
   * adds the multiple attribute to the select
   */
  multiple: PropTypes.bool,
  /**
   * onChange handler for the select
   */
  onChange: PropTypes.func,
  /**
   * adds required attribute to the select field and label
   */
  required: PropTypes.bool,
};

export default Select;

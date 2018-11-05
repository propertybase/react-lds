import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const ComboboxDropdownList = (props) => {
  const {
    children,
    height,
    id
  } = props;

  if (!children) return null;

  const listClasses = [
    { [`slds-dropdown_length-with-icon-${height}`]: height },
    'slds-dropdown',
    'slds-dropdown_fluid',
    'slds-listbox',
    'slds-listbox_vertical',
  ];

  return (
    <div id={`listbox-${id}`} role="listbox">
      <ul className={cx(listClasses)} role="presentation">
        {children}
      </ul>
    </div>
  );
};

ComboboxDropdownList.propTypes = {
  /**
   * list content
   */
  children: PropTypes.node,
  /**
   * sets the number of items being displayed
   */
  height: PropTypes.oneOf([5, 7, 10]),
  /**
   * unique id
   */
  id: PropTypes.string.isRequired,
};

ComboboxDropdownList.defaultProps = {
  children: null,
  height: null,
};

export default ComboboxDropdownList;

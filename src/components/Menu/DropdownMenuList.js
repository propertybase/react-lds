import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const DropdownMenuList = (props) => {
  const { checkbox, children, className, header, height, heightIcon, ...rest } = props;

  const renderHeader = () => {
    if (header) {
      return (
        <div className="slds-dropdown__header">
          <span className="slds-text-title_caps">{header}</span>
        </div>
      );
    }

    return null;
  };

  const makeChildrenCheckboxes = () =>
    children.map(child => React.cloneElement(child, { selected: child.props.selected === true }));
  // with this we set the selected prop to true or false (no undef or null)
  // so that the child becomes a menuitemcheckbox (not menuitem)

  const listClasses = [
    { [`slds-dropdown_length-${height}`]: height },
    { [`slds-dropdown_length-with-icon-${heightIcon}`]: heightIcon },
    'slds-dropdown__list',
  ];

  return (
    <div {...rest} className={className}>
      {renderHeader()}
      <ul className={cx(listClasses)} role="menu">
        {checkbox ? makeChildrenCheckboxes() : children}
      </ul>
    </div>
  );
};

DropdownMenuList.defaultProps = {
  checkbox: false,
  children: null,
  className: null,
  header: null,
  height: null,
  heightIcon: null,
};

DropdownMenuList.propTypes = {
  /**
   * make true if menuitems should be menuitemcheckboxes
   */
  checkbox: PropTypes.bool,
  /**
   * list content
   */
  children: PropTypes.arrayOf(PropTypes.element),
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * optional header for this list. Mostly useful is multiple
   * DropdownMenuListItems are in use
   */
  header: PropTypes.string,
  /**
   * sets the number of items being displayed
   */
  height: PropTypes.oneOf([5, 7, 10]),
  /**
   * use this instead of height if an leftIcon is on every item
   */
  heightIcon: PropTypes.oneOf([5, 7, 10]),
};

export default DropdownMenuList;

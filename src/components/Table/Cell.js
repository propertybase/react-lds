import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { uniqueId } from '../../utils';
import { IconSVG } from '../..';

const Cell = (props) => {
  const {
    children,
    className,
    isScrolled,
    isSticky,
    resizable,
    resizableAssistiveText,
    scope,
    sortable,
    sortDirection,
    sortAssistiveText,
    title,
    truncate,
    variation,
    ...rest
  } = props;

  const getTitle = () => {
    let text = null;

    if (title) {
      text = title;
    } else if (typeof children === 'string') {
      text = children;
    } else if (React.isValidElement(children) && typeof children.props.children === 'string') {
      text = children.props.children;
    }

    return text;
  };

  const inputId = uniqueId('resize-handle-');
  const cellTitle = getTitle();
  const isHeader = scope === 'col' || scope === 'row';
  const CellElement = isHeader ? 'th' : 'td';
  const cellScope = isHeader ? scope : null;

  const cellContent = (key) => {
    if ((!!resizable || !!sortable) && typeof children === 'string') {
      return (<span key={key}>{children}</span>);
    }

    return children;
  };

  const resizeHandle = (key) => {
    if (resizable) {
      return (
        <div key={key} className="slds-resizable">
          <label className="slds-assistive-text" htmlFor={inputId}>{resizableAssistiveText}</label>
          <input
            className="slds-resizable__input slds-assistive-text"
            type="range"
            min="20"
            max="1000"
            id={inputId}
          />
          <span className="slds-resizable__handle">
            <span className="slds-resizable__divider" />
          </span>
        </div>
      );
    }

    return null;
  };

  const sortIcon = (key) => {
    if (!!sortable && isHeader) {
      return (
        <div key={key} className="slds-icon_container" title={sortAssistiveText}>
          <IconSVG
            className="slds-is-sortable__icon slds-icon-text-default"
            icon="arrowdown"
            size="x-small"
            sprite="utility"
          />
        </div>
      );
    }

    return null;
  };

  const assistiveText = (key) => {
    if (!!sortable && isHeader) {
      return (<span key={key} className="slds-assistive-text">{cellTitle}</span>);
    }

    return null;
  };

  const wrapChildren = (content) => {
    if (isHeader) {
      return sortable
        ? <a className="slds-th__action slds-text-link_reset">{content}</a>
        : <span>{content}</span>;
    }

    return content;
  };

  const childArray = [];
  childArray.push(cellContent(1));
  childArray.push(resizeHandle(2));
  childArray.push(sortIcon(3));
  childArray.push(assistiveText(4));

  const variationClasses = Array.isArray(variation) ? variation.map(f => `slds-${f}`) : `slds-${variation}`;

  const sldsClasses = [
    { 'slds-is-resizable': scope === 'col' && !!resizable },
    { 'slds-is-sortable': !!sortable },
    { 'slds-is-sorted_asc': !!sortable && sortDirection === 'asc' },
    variationClasses,
    className,
  ];

  const wrappedChildren = wrapChildren(childArray);
  const wrapperClassName = cx({ 'slds-truncate': truncate });
  const isHeaderSticky = isHeader && isSticky;
  let style = null;
  if (isHeaderSticky) {
    style = isScrolled ? Cell.STICKY_SCROLLED_STYLE : Cell.STICKY_TOP_STYLE;
  }

  return (
    <CellElement
      {...rest}
      className={cx(sldsClasses)}
      scope={cellScope}
      style={style}
    >
      <div className={wrapperClassName} title={cellTitle}>
        {wrappedChildren}
      </div>
    </CellElement>
  );
};

Cell.STICKY_TOP_STYLE = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
};

Cell.STICKY_SCROLLED_STYLE = {
  ...Cell.STICKY_TOP_STYLE,
  borderBottom: '1px solid rgb(221, 219, 218)',
};

Cell.defaultProps = {
  children: null,
  className: null,
  isScrolled: false,
  isSticky: false,
  resizable: false,
  resizableAssistiveText: 'Resize Cell',
  scope: null,
  sortable: false,
  sortAssistiveText: 'Sort Column',
  sortDirection: 'asc',
  title: null,
  truncate: true,
  variation: [],
};

Cell.propTypes = {
  /**
   * cell content
   */
  children: PropTypes.node,
  /**
   * class name
   */
  className: PropTypes.string,
  /**
   * Whether the table has been scrolled
   */
  isScrolled: PropTypes.bool,
  /**
   * Whether the cell is a sticky header cell
   */
  isSticky: PropTypes.bool,
  /**
   * makes the cell resizable
   */
  resizable: PropTypes.bool,
  /**
   * assistiveText for resize handler
   */
  resizableAssistiveText: PropTypes.string,
  /**
   * only `th` cells have a scope. Header cells have a col scope, and leading body cells can have a row scope
   */
  scope: PropTypes.oneOf(['col', 'row']),
  /**
   * renders a sortable cell
   */
  sortable: PropTypes.bool,
  /**
   * assistive text for the sort icon
   */
  sortAssistiveText: PropTypes.string,
  /**
   * sortDirection
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  /**
   * overrides the cell's title attribute
   */
  title: PropTypes.string,
  /**
   * Whether the cell content should be truncated
   */
  truncate: PropTypes.bool,
  /*
   * Variation: string or array of strings. Variations: cell-wrap, cell-shrink
   */
  variation: PropTypes.oneOfType([PropTypes.oneOf([
    'cell-wrap',
    'cell-shrink',
  ]), PropTypes.arrayOf(PropTypes.oneOf([
    'cell-wrap',
    'cell-shrink',
  ]))]),
};

export default Cell;

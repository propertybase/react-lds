import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash.pick';

import { uniqueId } from '../../utils';
import HeadCell from './HeadCell';

const TableHead = (props) => {
  const {
    columns,
    isAllSelected,
    isSelectable,
    isActionable,
    onSort,
    onToggle,
    sortBy,
    sortDirection,
  } = props;

  let checkboxCell = null;

  if (isSelectable) {
    const checkboxId = uniqueId('checkbox-');

    checkboxCell = (
      <th
        className="slds-text-align--right"
        scope="col"
        style={{ width: '3.25rem' }}
      >
        <div>
          <span className="slds-checkbox">
            <input
              id={checkboxId}
              name="options"
              onChange={onToggle}
              type="checkbox"
              checked={isAllSelected}
            />
            <label className="slds-checkbox__label" htmlFor={checkboxId}>
              <span className="slds-checkbox--faux" />
              <span className="slds-form-element__label slds-assistive-text">
                Select All
              </span>
            </label>
          </span>
        </div>
      </th>
    );
  }

  let actionsCell = null;
  if (isActionable) {
    actionsCell = (
      <th scope="col" style={{ width: '3.25rem' }}>
        <div className="slds-th__action">
          <span className="slds-assistive-text">Actions</span>
        </div>
      </th>
    );
  }

  const headCells = columns.map((conf) => {
    const mainProps = pick(conf, ['dataKey', 'isResizable', 'sortable', 'title']);
    const sortProps = conf.sortable
      ? {
        onSort,
        sortBy,
        sortDirection,
      }
      : {};

    return (
      <HeadCell
        {...mainProps}
        {...sortProps}
        key={conf.dataKey}
      />
    );
  });

  return (
    <thead>
      <tr className="slds-line-height--reset">
        {checkboxCell}
        {headCells}
        {actionsCell}
      </tr>
    </thead>
  );
};

TableHead.defaultProps = {
  isActionable: false,
  isAllSelected: false,
  isSelectable: false,
  onToggle: null,
  onSort: null,
  sortBy: null,
  sortDirection: null,
};

TableHead.propTypes = {
  /**
   * Array containing column configurations
   */
  columns: PropTypes.array.isRequired,

  /**
   * Does each row below have a trailing "Show more" element?
   */
  isActionable: PropTypes.bool,

  /**
   * Are all table rows selected at the moment?
   */
  isAllSelected: PropTypes.bool,

  /**
   * Is this row selectable, i.e. should it show a checkbox in front?
   */
  isSelectable: PropTypes.bool,

  /**
   * Callback triggered by activating/deactivating the "all rows" selection
   * checkbox. Required when `props.isSelectable` is `true`.
   */
  onToggle: PropTypes.func,

  /**
   * Callback triggered by clicking on a cell heading a sortable column.
   * Required when any columns `sortable` is `true`.
   */
  onSort: PropTypes.func,

  /**
   * The column's `dataKey` which is currently used for sorting. Empty string
   * if no sorting is applied.
   */
  sortBy: PropTypes.string,

  /**
   * Current sort direction (`asc` or `desc`), defaults to `asc`.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
};


export default TableHead;
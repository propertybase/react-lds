import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash-es/omit';
import debounce from 'lodash-es/debounce';

import { Table, uniqueId } from '../..';
import { propTypes as tablePropTypes } from '../Table/Table';

import defaultRowRenderer from './defaultRowRenderer';

class DataTable extends Component {
  constructor(props) {
    super(props);

    const {
      data,
      sortBy,
      sortDirection,
    } = this.props;

    this.state = {
      id: uniqueId('data-table-advanced-'),
      columns: [],
      data,
      isScrolled: false,
      sortBy,
      sortDirection,
    };

    this.scrollContainer = React.createRef();
    this.onScroll = debounce(this.onScroll, 50);
  }

  componentWillMount() {
    this.updateColumns();
  }

  componentWillReceiveProps(nextProps) {
    const {
      children, data, sortBy, sortDirection
    } = this.props;

    if (nextProps.children !== children) {
      this.updateColumns();
    }

    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data });
    }

    if (nextProps.sortBy !== sortBy || nextProps.sortDirection !== sortDirection) {
      this.setState({
        sortBy: nextProps.sortBy,
        sortDirection: nextProps.sortDirection,
      });
    }
  }

  onScroll = () => {
    const scrollTop = this.scrollContainer.current.scrollTop; // eslint-disable-line
    this.setState({ isScrolled: scrollTop > 0 });
  };

  onSelect = (rowId) => {
    const { onSelect, selection } = this.props;

    if (onSelect) {
      const nextSelection = [...selection];

      if (nextSelection.includes(rowId)) {
        nextSelection.splice(nextSelection.indexOf(rowId), 1);
      } else {
        nextSelection.push(rowId);
      }

      onSelect(nextSelection, rowId);
    }
  }

  onSelectAll = () => {
    const { onSelect, getRowId } = this.props;
    const { data } = this.state;
    const allSelected = this.areAllRowsSelected();
    const nextSelection = allSelected
      ? []
      : data.map((rowData, rowIndex) => getRowId({ rowData, rowIndex }));

    if (onSelect) {
      onSelect(nextSelection);
    }

    this.setState({ allSelected: !allSelected });
  }

  onSort = (nextSortBy = '') => {
    const { onSort } = this.props;
    const { data, sortBy, sortDirection } = this.state;

    let nextSortDirection = 'asc';

    // Same column as before => toggle sort order
    if (sortBy === nextSortBy) {
      nextSortDirection = (sortDirection === 'asc') ? 'desc' : 'asc';
    }

    const nextState = {
      sortBy: nextSortBy,
      sortDirection: nextSortDirection,
    };

    if (onSort) {
      onSort({ dataKey: nextSortBy, sortDirection: nextSortDirection });
      this.setState(nextState);
    } else {
      this.setState({
        ...nextState,
        data: [...data].sort(
          (a, b) => (
            nextSortDirection === 'asc'
              ? String(a[nextSortBy]).localeCompare(b[nextSortBy])
              : String(b[nextSortBy]).localeCompare(a[nextSortBy])
          )
        ),
      });
    }
  }

  // Loops over the `DataTableColumn` children and extracts their props as
  // config objects into `this.state.columns`.
  updateColumns() {
    const { children } = this.props;

    if (children) {
      this.setState({
        columns: React.Children.toArray(children)
          .filter(child => React.isValidElement(child))
          .map(child => child.props),
      });
    } else {
      this.setState({ columns: [] });
    }
  }

  areAllRowsSelected() {
    const { getRowId, selection } = this.props;
    const { data } = this.state;
    const allSelectedReducer = (acc, rowData, rowIndex) => (
      acc && selection.includes(getRowId({ rowIndex, rowData }))
    );

    return data.reduce(allSelectedReducer, true);
  }

  renderRow(rowData, rowIndex) {
    const { columns, id } = this.state;
    const {
      getCellData, getRowId, rowRenderer, selection
    } = this.props;
    const rowId = getRowId({ rowIndex, rowData });

    const cells = columns.map(({ cellRenderer, dataKey, title }) => cellRenderer({
      cellData: getCellData({ rowData, dataKey }),
      dataKey,
      rowData,
      rowId,
      rowIndex,
      selected: selection.includes(rowId),
      onSelect: this.onSelect,
      tableId: id,
      defaultProps: {
        'data-label': title,
        key: `${rowId}-${dataKey}`,
        role: 'gridcell',
      },
    }));

    return rowRenderer({
      cells,
      onSelect: this.onSelect,
      rowData,
      rowId,
      tableId: id,
    });
  }

  renderHead() {
    const { stickyHeader, variation } = this.props;
    const {
      columns, id, isScrolled, sortBy, sortDirection
    } = this.state;

    const hasHiddenHeader = !stickyHeader && variation.includes('header-hidden');

    return (
      <thead className={hasHiddenHeader ? 'slds-assistive-text' : null}>
        <tr>
          {columns.map(({ headRenderer, ...restProps }) => headRenderer({
            allSelected: this.areAllRowsSelected(),
            isSticky: stickyHeader,
            isScrolled,
            onSelectAll: this.onSelectAll,
            onSort: this.onSort,
            sortBy,
            sortDirection,
            tableId: id,
            ...restProps
          }))}
        </tr>
      </thead>
    );
  }

  renderBody() {
    const { noRowsRenderer } = this.props;
    const { columns, data, id } = this.state;

    if (!Array.isArray(data) || data.length === 0) {
      return noRowsRenderer({ columns, tableId: id });
    }

    return (
      <tbody>
        {data.map((row, i) => this.renderRow(row, i))}
      </tbody>
    );
  }

  render() {
    const { stickyHeader } = this.props;
    const rest = omit(this.props, [
      'children',
      'data',
      'getCellData',
      'getRowId',
      'noRowsRenderer',
      'onSelect',
      'onSort',
      'rowRenderer',
      'selection',
      'sortBy',
      'sortDirection',
    ]);
    const table = (
      <Table {...rest}>
        {this.renderHead()}
        {this.renderBody()}
      </Table>
    );

    if (stickyHeader) {
      return (
        <div
          className="slds-grid slds-grid_vertical slds-scrollable"
          onScroll={this.onScroll}
          ref={this.scrollContainer}
        >
          <div>
            {table}
          </div>
        </div>
      );
    }

    return table;
  }
}

DataTable.defaultProps = {
  ...Table.defaultProps,

  getCellData: ({ rowData, dataKey }) => rowData[dataKey],
  getRowId: ({ rowIndex }) => rowIndex,
  onSort: null,
  onSelect: null,
  rowRenderer: defaultRowRenderer,
  noRowsRenderer: () => {},
  selection: [],
  sortBy: '',
  sortDirection: 'asc',
};

DataTable.propTypes = {
  ...tablePropTypes,

  /**
   * Table content, an array of objects
   */
  data: PropTypes.arrayOf(PropTypes.any).isRequired,

  /**
   * Getter which returns a unique id for a row. The default implementation will
   * just use the row index. Overwrite this with a better id if you plan on
   * using a variable `data` array.
   */
  getRowId: PropTypes.func,

  /**
   * Getter which returns the value for a single cell. Receives the current row
   * and the column's data key.
   */
  getCellData: PropTypes.func,

  /**
   * Render callback which is called if the data array is empty. Should return a
   * table body.
   */
  noRowsRenderer: PropTypes.func,

  /**
   * Callback, triggered by clicks on sortable column headers.  Receives an object
   * which contains the `dataKey` of the column to sort by and the `sortDirection`
   * (`asc` or `desc`). If omitted, the rows will be sorted by a `String.localeCompare`.
   */
  onSort: PropTypes.func,

  /**
   * Callback, triggered whenever one or more rows have been selected. Returns
   * an array containing all selected row IDs.
   */
  onSelect: PropTypes.func,

  /**
   * Callback used for rendering rows. See `defaultRowRenderer` for a sample.
   */
  rowRenderer: PropTypes.func,

  /**
   * Array of indexes of selected rows.
   */
  selection: PropTypes.array,

  /**
   * Initial sort column, identified by `dataKey`.
   */
  sortBy: PropTypes.string,

  /**
   * Initial sort direction (`asc` or `desc`).
   */
  sortDirection: PropTypes.string,
};

export default DataTable;

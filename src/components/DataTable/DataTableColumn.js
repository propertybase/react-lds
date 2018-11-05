import { Component } from 'react';
import PropTypes from 'prop-types';

import defaultCellRenderer from './defaultCellRenderer';
import defaultHeadRenderer from './defaultHeadRenderer';

/* eslint-disable react/no-unused-prop-types */
export const propTypes = {
  cellRenderer: PropTypes.func,
  headRenderer: PropTypes.func,
  dataKey: PropTypes.string.isRequired,
  isResizable: PropTypes.bool,
  sortable: PropTypes.bool,
  title: PropTypes.string,
};
// eslint-enable

/* eslint-disable react/prefer-stateless-function */
class DataTableColumn extends Component {
  static propTypes = propTypes

  static defaultProps = {
    cellRenderer: defaultCellRenderer,
    headRenderer: defaultHeadRenderer,
    isResizable: false,
    sortable: false,
    title: null,
  }
}

export default DataTableColumn;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EntityCombobox,
  defaultEntityComboboxItemRenderer,
} from '../Combobox';
import ComboboxGroupedListbox from './ComboboxGroupedListbox';

class GroupedCombobox extends Component {
  static propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    onExpand: PropTypes.func.isRequired,
    renderItem: PropTypes.func,
    renderListbox: PropTypes.func,
  }

  static defaultProps = {
    renderListbox: null,
    renderItem: defaultEntityComboboxItemRenderer,
  }

  renderListbox = (listboxProps, opts) => {
    const { isExpanded, onExpand, renderListbox } = this.props;

    const sharedProps = {
      ...listboxProps,
      isExpanded,
      onExpand
    };

    if (renderListbox) return renderListbox(sharedProps, opts);
    return <ComboboxGroupedListbox {...sharedProps} />;
  }

  render() {
    const { isExpanded, onExpand, ...rest } = this.props;
    return (
      <EntityCombobox
        {...rest}
        renderListbox={this.renderListbox}
      />
    );
  }
}

export default GroupedCombobox;

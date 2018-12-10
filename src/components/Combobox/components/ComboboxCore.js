import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash-es/memoize';
import { ClickOutside } from '../../ClickOutside';
import ComboboxDropdown from './ComboboxDropdown';
import ComboboxDropdownLists from './ComboboxDropdownLists';
import { DropdownItemLoading } from './DropdownItems';
import { handleIndexChange, scrollDropdown } from '../utils/helpers';
import ComboboxListbox from './ComboboxListbox';

const byItemId = value => ({ id }) => id === value;

class ComboboxCore extends Component {
  static propTypes = {
    /**
     * When set to true, selecting an item will close the dropdown
     */
    closeOnSelect: PropTypes.bool,
    /**
     * Number of results displayed in the result dropdown
     */
    height: PropTypes.oneOf([5, 7, 10]),
    /**
     * Unique identifier
     */
    id: PropTypes.string.isRequired,
    /**
     * Switch to render single selection as `inline` listboxs. Set by `EntityCombobox`
     */
    isInlineListboxSelection: PropTypes.bool,
    /**
     * Appends a `loading` spinner to the result items to
     */
    isLoading: PropTypes.bool,
    /**
     * Defines whether the Combobox allows more than one selection
     */
    isMultiSelect: PropTypes.bool,
    /**
     * Determines whether the result dropdown is rendered
     */
    isOpen: PropTypes.bool,
    /**
     * Array of items that will be displayed in the selection dropdown
     * `isHeader` items break the dropdown into sublists
     */
    items: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        sprite: PropTypes.string.isRequired,
      }),
      id: PropTypes.string.isRequired,
      isHeader: PropTypes.bool,
      label: PropTypes.string.isRequired,
      meta: PropTypes.node,
    })),
    /**
     * Label of the Combobox
     */
    label: PropTypes.string.isRequired,
    /**
     * Assistive label for the Listbox of selected items
     */
    labelListbox: PropTypes.string,
    /**
     * Placeholder shown in the Dropdown input when no items are selected yet
     */
    placeholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func,
    /**
     * Callback to update selection state
     * Called with (id, {
     *   isReplace (bool) whether the passed `id` should replace the current selection state
     *   isRemove (bool) whether the passed `id` is deselected
     *   isAdd (bool) whether the passed `id` is an item not present in the Combobox
     * })
     */
    onSelect: PropTypes.func.isRequired,
    /**
     * Callback to manage isOpen state
     * Called with (bool) indicating next state
     */
    onToggle: PropTypes.func.isRequired,
    /**
     * Renders the input element
     */
    renderInput: PropTypes.func.isRequired,
    /**
     * Renders each non-header `item` in `items`
     */
    renderItem: PropTypes.func.isRequired,
    /**
     * Renders a `ComboboxDropdownItem` after the last displayed result
     */
    renderItemsAppended: PropTypes.func,
    /**
     * Renders a `ComboboxDropdownItem` after the last displayed result
     */
    renderItemsPrepended: PropTypes.func,
    /**
     * Renders beneath Combobox. Used to display a Listbox of Pills in multi-select Comboboxes
     */
    renderListbox: PropTypes.func,
    /**
     * Array of `id`s that are currently selected
     */
    selectedItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      isHeader: PropTypes.bool,
      label: PropTypes.string.isRequired,
    })),
  }

  static defaultProps = {
    closeOnSelect: true,
    height: 5,
    items: [],
    selectedItems: [],
    isInlineListboxSelection: false,
    isMultiSelect: false,
    isLoading: false,
    isOpen: false,
    labelListbox: 'Selected Items',
    onSearch: null,
    renderItemsAppended: null,
    renderItemsPrepended: null,
    renderListbox: listboxProps => <ComboboxListbox {...listboxProps} />,
  }

  constructor(props) {
    super(props);
    this.state = { keyboardSelection: null };
    this.inputRef = React.createRef();
    this.dropdownRef = React.createRef();
    this.makeSelectHandler = memoize(key => evt => this.onSelect(key, evt));
  }

  onToggle = () => {
    const { isOpen, onToggle } = this.props;
    onToggle(!isOpen);
  }

  onClose = () => {
    const { onToggle } = this.props;
    onToggle(false);
  }

  onOpen = () => {
    const { onToggle } = this.props;
    onToggle(true);
  }

  onSelect = (id, evt) => {
    if (evt) { evt.preventDefault(); }

    const {
      closeOnSelect,
      isMultiSelect,
      onSelect,
      onToggle,
      selectedItems,
    } = this.props;

    const isRemove = selectedItems.findIndex(byItemId(id)) > -1;

    const isReplace = !isMultiSelect
      && !isRemove
      && selectedItems.length > 0;

    onSelect(id, { isRemove, isReplace });
    this.setState({ keyboardSelection: null });

    if (closeOnSelect) onToggle(false);
  }

  onInputMouseDown = () => {
    const inputRef = this.inputRef.current;
    const isFocused = document.activeElement === inputRef;

    if (isFocused) {
      this.onToggle();
    } else {
      inputRef.focus();
      this.onOpen();
    }
  }

  onInputKeyDown = (evt) => {
    const { key } = evt;
    const {
      isMultiSelect,
      isOpen,
      items,
      onSearch,
      onToggle,
      selectedItems,
    } = this.props;
    const { keyboardSelection } = this.state;

    const filteredItems = items.filter(item => !item.isHeader);
    const len = filteredItems.length;

    const isDelete = key === 'Backspace' || key === 'Delete';
    const isEscape = key === 'Escape';
    const isEnter = key === 'Enter';
    const isDownArrow = key === 'ArrowDown' || key === 'Down';
    const isUpArrow = key === 'ArrowUp' || key === 'Up';


    // (1) Open the dropdown when a key is pressed and it's closed
    const isKeyboardOpen = !isOpen
      && !isUpArrow
      && !isDelete
      && !isEscape
      && key !== 'Tab';

    if (isKeyboardOpen) {
      onToggle(true);
      return true;
    }

    // (2) Remove selections when encountering delete keys
    if (isDelete) {
      if (keyboardSelection != null) {
        evt.preventDefault();
        const inputVal = evt.target.value;
        onSearch(inputVal.substring(0, inputVal.length - 1), false);
        this.setState({ keyboardSelection: null });
      }

      const isKeyboardRemove = !isMultiSelect && selectedItems.length === 1;
      if (isKeyboardRemove) this.onSelect(selectedItems[0].id, evt);
      return true;
    }

    // (3) Finalize keyboard selection when enter is pressed
    const isKeyboardSelect = isOpen
      && keyboardSelection != null
      && isEnter;

    if (isKeyboardSelect) {
      evt.preventDefault();
      this.onSelect(keyboardSelection);
      return true;
    }

    // (4) Adjust keyboard selection when an arrow is pressed
    const isKeyboardCycle = isOpen && (isDownArrow || isUpArrow) && len > 0;

    if (isKeyboardCycle) {
      evt.preventDefault();
      this.setState(({ keyboardSelection: prevSelection }) => {
        const prevIndex = filteredItems.findIndex(byItemId(prevSelection));
        const nextIndex = handleIndexChange(filteredItems, prevIndex, isDownArrow ? 'desc' : 'asc');
        const dropdown = this.dropdownRef.current;
        // This works since this mirrors `filteredItems`
        // It may be faster to keep a refMap of items and augment the DOM access that way
        const childNodes = dropdown.querySelectorAll('.slds-listbox__option[role="option"]');
        scrollDropdown(dropdown, childNodes[nextIndex]);
        const { id } = filteredItems[nextIndex];
        return { keyboardSelection: id };
      });

      return true;
    }

    return false;
  }

  onInputFocus = (evt) => {
    const isUserEvent = evt.nativeEvent.which != null;
    const { onToggle, isOpen } = this.props;
    if (isUserEvent) onToggle(!isOpen);
  }

  getOpts() {
    const { isMultiSelect, items, selectedItems } = this.props;
    const { keyboardSelection } = this.state;

    return {
      isMultiSelect,
      items,
      keyboardSelection,
      selectedItems,
      makeSelectHandler: this.makeSelectHandler
    };
  }

  renderInput = () => {
    const {
      id,
      placeholder,
      onSearch,
      renderInput,
    } = this.props;

    const opts = this.getOpts();
    const listboxId = `listbox-${id}`;

    return renderInput({
      'aria-controls': listboxId,
      autoComplete: 'off',
      id,
      onBlur: this.onClose,
      onChange: onSearch,
      onFocus: this.onInputFocus,
      onKeyDown: this.onInputKeyDown,
      onMouseDown: this.onInputMouseDown,
      placeholder,
      ref: this.inputRef,
      role: 'textbox',
    }, opts);
  }

  renderItem = ({ id, ...rest }) => {
    const { renderItem, selectedItems } = this.props;
    const { keyboardSelection } = this.state;

    const opts = this.getOpts();

    return renderItem({
      ...rest,
      id,
      isFocus: id === keyboardSelection,
      isSelected: selectedItems.findIndex(byItemId(id)) > -1,
    }, opts);
  }

  renderItemsAppended = () => {
    const { isLoading, renderItemsAppended } = this.props;
    if (!isLoading && !renderItemsAppended) return null;

    return (
      <React.Fragment>
        {renderItemsAppended && renderItemsAppended()}
        {isLoading && <DropdownItemLoading />}
      </React.Fragment>
    );
  }

  render() {
    const {
      height,
      id,
      items,
      isMultiSelect,
      label,
      labelListbox,
      isInlineListboxSelection,
      isLoading,
      isOpen,
      renderItemsAppended,
      renderItemsPrepended,
      renderListbox,
      selectedItems,
    } = this.props;
    const { keyboardSelection } = this.state;

    const opts = this.getOpts();
    const listboxId = `listbox-${id}`;

    return (
      <ClickOutside
        handleEsc
        onClickOutside={this.onClose}
        condition={isOpen}
      >
        <ComboboxDropdown
          height={height}
          id={`combobox-${id}`}
          isSingleInlineSelection={isInlineListboxSelection && !isMultiSelect && selectedItems.length === 1}
          label={label}
          listboxId={listboxId}
          isOpen={isOpen}
          ref={this.dropdownRef}
          renderInput={this.renderInput}
        >
          <ComboboxDropdownLists
            items={items}
            renderItem={this.renderItem}
            renderItemsAppended={this.renderItemsAppended}
            renderItemsPrepended={renderItemsPrepended}
            // Passed down to bust `React.memo` caching if necessary
            isLoading={isLoading}
            keyboardSelection={keyboardSelection}
            renderAppended={renderItemsAppended}
            selectedItems={selectedItems}
          />
        </ComboboxDropdown>
        {!isOpen && isMultiSelect && renderListbox && renderListbox({
          label: labelListbox,
          makeSelectHandler: this.makeSelectHandler,
          selectedItems,
        }, opts)}
      </ClickOutside>
    );
  }
}

export default ComboboxCore;
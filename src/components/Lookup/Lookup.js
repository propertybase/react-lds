import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import debounce from 'lodash.debounce';
import omit from 'lodash.omit';

import { prefixClasses } from '../../utils';
import {
  FormElement,
  FormElementControl,
  FormElementLabel,
  Icon,
  IconSVG,
  InputRaw,
  Pill,
  PillContainer,
  Table,
  Row,
  Cell,
} from '../../';

const validateSelection = (props, propName, componentName, ...rest) => {
  const arrayValidation = React.PropTypes.array(props, propName, componentName, ...rest);

  if (arrayValidation === null && props[propName].length > 1 && !props.multi) {
    return new Error(`${componentName}.initialSelection should not supply multiple selections to a single-item
        lookup`);
  }

  return arrayValidation;
};

/**
* use standard sprite and if custom icon is used, custom sprite
*/
function getSprite(objectType = '') {
  if (objectType.startsWith('custom')) {
    return 'custom';
  }

  return 'standard';
}

function filterDisplayItems(src, target, prop = 'id') {
  return src.filter(o1 => !target.some(o2 => o1[prop] === o2[prop]));
}

export class Lookup extends React.Component {
  static contextTypes = { cssPrefix: React.PropTypes.string };
  static propTypes = {
    /**
     * class name
     */
    className: React.PropTypes.string,
    /**
     * renders a different layour without borders (bare) for email docked
     * composer
     */
    emailLayout: React.PropTypes.bool,
    /**
     * id of the input field in the lookup component
     */
    id: React.PropTypes.string.isRequired,
    /**
     * initial item selection
     */
    initialSelection: validateSelection,
    /**
     * label for the input field in the lookup component
     */
    inputLabel: React.PropTypes.string.isRequired,
    /**
     * label for the dropdown in the lookup component
     */
    listLabel: React.PropTypes.string.isRequired,
    /**
     * loads items into the lookup component
     */
    load: React.PropTypes.func.isRequired,
    /**
     * set true to call load() onInputChange (defaults to true)
     */
    loadOnChange: React.PropTypes.bool,
    /**
     * set true to call load() onInputFocus (defaults to false)
     */
    loadOnFocus: React.PropTypes.bool,
    /**
     * set true to call load() onComponentDidMount (defaults to false)
     */
    loadOnMount: React.PropTypes.bool,
    /**
     * renders the lookup in multiple mode
     */
    multi: React.PropTypes.bool,
    /**
     * onChange handler for the lookup. has selected items as first argument
     */
    onChange: React.PropTypes.func,
    /**
     * onFocus handler for the input field in the lookup
     */
    onFocus: React.PropTypes.func,
    /**
     * gets called when a result is chosen. gets passed the pill and expects a cloned Pill back
     */
    onResultAdd: React.PropTypes.func,
    /**
     * placeholder for the input field in lookup
     */
    placeholder: React.PropTypes.string,
    /**
     * if set to true, allows the creation of new elements that were not found
     * during lookups. For example new email addresses.
     * The new entry will not have an object type and the ID will be the current
     * timestamp.
     */
    allowCreate: React.PropTypes.bool,
    /**
     * if set, renders the Advanced Modal table layout
     */
    table: React.PropTypes.bool,
    tableFields: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
      })
    ),
    /**
     * Label behind the number of Results in the table header
     */
    tableResultsHeading: React.PropTypes.string,
  };

  static defaultProps = {
    initialSelection: [],
    loadOnChange: true,
    multi: false,
    placeholder: 'Search',
    tableResultsHeading: 'Results',
  };

  constructor(props, context) {
    super(props, context);

    this.prefix = (classes, passThrough) => prefixClasses(this.context.cssPrefix, classes, passThrough);
    this.state = {
      searchTerm: '',
      highlighted: null,
      open: false,
      loaded: [],
      selected: this.props.initialSelection,
    };

    this.handleLoad = debounce(this.handleLoad, 400);
    this.handleCreateElement = this.handleCreateElement.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
  }

  componentWillMount() {
    if (this.props.loadOnMount) {
      this.handleLoad();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!!this.props.onChange && this.state.selected !== nextState.selected) {
      this.props.onChange(nextState.selected);
    }
  }

  // Event Handlers
  handleClickOutside() {
    this.closeList();
  }

  handleLoad(searchTerm) {
    const param = typeof searchTerm === 'string' ? searchTerm : this.state.searchTerm;
    Promise.resolve(this.props.load(param))
      .then((data) => {
        if (Array.isArray(data)) {
          this.setState({ loaded: data });
        }
      });
  }

  handleInputChange(event) {
    this.setState({ searchTerm: event.target.value });
    if (this.props.loadOnChange) {
      this.handleLoad(event.target.value);
    }
  }

  handleInputFocus(e) {
    this.openList();

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }

    if (this.props.loadOnFocus) {
      this.handleLoad();
    }
  }

  handleCreateElement(e) {
    // if no result was found and enter was pressed, allow creation of new
    // element
    if (
      this.props.allowCreate &&
      this.props.multi &&
      e.charCode === 13 &&
      this.state.loaded.length === 0
    ) {
      const selected = this.state.selected;
      selected.push({
        id: Date.now(),
        label: e.target.value,
      });
      this.setState({ selected, searchTerm: '', open: false });
    }
  }

  // List Toggles
  toggleList(state) {
    this.setState({ open: state });
  }

  closeList() {
    if (this.state.open) {
      this.toggleList(false);
    }
  }

  openList() {
    // single selection
    if (!this.state.open && !this.props.multi && this.state.selected.length < 1) {
      this.toggleList(true);
    }

    // multi selection
    if (!this.state.open && this.props.multi) {
      this.toggleList(true);
    }
  }

  // Result handlers
  addSelection(item) {
    let selected = this.state.selected;

    if (selected.indexOf(item) === -1) {
      if (this.props.multi) {
        selected = [...selected, item];
      } else {
        selected = [item];
      }

      this.closeList();
    }

    this.setState({ selected, searchTerm: '' });
  }

  removeSelection(item) {
    const selected = this.state.selected.filter(select => select.id !== item.id);

    this.setState({ selected });
  }

  highlightSelection(id) {
    this.setState({ highlighted: id });
  }

  // Elements
  input() {
    // hide single select
    if (!this.props.multi && !this.state.open && this.state.selected.length > 0) {
      return null;
    }

    // hide multi select
    if (this.props.multi && !this.state.open && this.state.selected.length > 0) {
      return null;
    }

    if (this.props.emailLayout) {
      return (
        <FormElementControl>
          <input
            className={this.prefix(['input--bare', 'input--height'])}
            id={this.props.id}
            type="text"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            onKeyPress={this.handleCreateElement}
            value={this.state.searchTerm}
            ref={(input) => { if (input && this.state.open) { input.focus(); } }}
          />
        </FormElementControl>
      );
    }

    return (
      <FormElementControl hasIconRight>
        <InputRaw
          aria-activedescendant={this.state.highlighted}
          aria-expanded={this.state.open}
          iconRight="search"
          value={this.state.searchTerm}
          id={this.props.id}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onKeyPress={this.handleCreateElement}
          placeholder={this.props.placeholder}
          role="combobox"
          isFocused={this.state.open}
        />
      </FormElementControl>
    );
  }

  selections() {
    if (this.state.selected.length < 1) {
      return null;
    }

    const selectionPills = this.state.selected.map((item, i) => {
      const sldsClasses = this.props.multi ? null : ['size--1-of-1'];
      const onClose = (e) => {
        e.stopPropagation();
        this.removeSelection(item);
      };
      const icon =
        item.objectType ? (<Icon sprite={getSprite(item.objectType)} icon={item.objectType} />) : undefined;

      let resultPill = (
        <Pill
          className={this.prefix(sldsClasses)}
          icon={icon}
          id={item.id}
          key={i}
          label={item.label}
          onClose={onClose}
          title={item.label}
        />
      );

      if (this.props.onResultAdd) {
        const replacedPill = this.props.onResultAdd(resultPill, item);

        if (React.isValidElement(replacedPill)) {
          resultPill = replacedPill;
        }
      }

      return resultPill;
    });

    return (
      <PillContainer bare={this.props.emailLayout} onClick={() => this.openList()}>{selectionPills}</PillContainer>
    );
  }

  controls() {
    const hasSelection = this.state.selected.length > 0;

    if (hasSelection) {
      return this.selections();
    }

    return this.input();
  }

  lookupItem(item, i) {
    const sldsClasses = ['lookup__item-action', 'media', 'media--center'];

    const renderMeta = () => {
      if (item.meta) {
        return (<span className={this.prefix(['lookup__result-meta', 'text-body--small'])}>{item.meta}</span>);
      }

      return null;
    };

    return (
      <li key={i} role="presentation">
        <span
          className={this.prefix(sldsClasses)}
          id={`${this.props.id}-option-${i}`}
          onClick={() => this.addSelection(item)}
          onMouseOver={() => this.highlightSelection(item.id)}
          role="option"
        >
          <IconSVG
            className={this.prefix('media__figure')}
            sprite={getSprite(item.objectType)}
            icon={item.objectType}
          />
          <div className={this.prefix('media__body')}>
            <div className={this.prefix('lookup__result-text')}>{item.label}</div>
            {renderMeta()}
          </div>
        </span>
      </li>
    );
  }

  lookupItems() {
    if (this.state.loaded.length > 0) {
      const displayItems = filterDisplayItems(this.state.loaded, this.state.selected);
      return displayItems.map((item, i) => this.lookupItem(item, i));
    }

    return null;
  }

  lookupList() {
    if (!this.props.table && this.state.open && this.state.loaded.length > 0) {
      return (
        <div className={this.prefix('lookup__menu')} role="listbox">
          <div className={this.prefix(['lookup__item--label', 'text-body--small'])}>
            {this.props.listLabel}
          </div>
          <ul className={this.prefix('lookup__list')} role="presentation">
            {this.lookupItems()}
          </ul>
        </div>
      );
    }

    return null;
  }

  lookupListTable() {
    const results = filterDisplayItems(this.state.loaded, this.state.selected);
    const renderBodyCell = (content, index, objectType) => {
      if (index === 0) {
        return (
          <a>
            {objectType ?
              (<Icon
                size="small"
                className={this.prefix('m-right--x-small')}
                sprite={getSprite(objectType)}
                icon={objectType}
              />) :
              undefined}
            {content}
          </a>
        );
      }

      return content;
    };

    if (this.props.table && results.length > 0) {
      return (
        <Table bordered className={this.prefix('m-top--small')}>
          <thead>
            <Row>
              <Cell scope="col" colSpan={this.props.tableFields.length}>
                {`${results.length} ${this.props.tableResultsHeading}`}
              </Cell>
            </Row>
            <Row>
              {this.props.tableFields.map(field =>
                <Cell scope="col" key={field.name}>{field.label}</Cell>
              )}
            </Row>
          </thead>
          <tbody>
            {results.map(item =>
              <Row key={item.id}>
                {this.props.tableFields.map((field, index) =>
                  <Cell
                    data-label={field.name}
                    scope={index === 0 ? 'row' : undefined}
                    onClick={() => this.addSelection(item)}
                    key={`${item.id}${index}`}
                  >
                    {renderBodyCell(item[field.name], index, item.objectType)}
                  </Cell>
                )}
              </Row>
            )}
          </tbody>
        </Table>
      );
    }

    return null;
  }

  render() {
    const rest = omit(this.props, Object.keys(Lookup.propTypes));
    const sldsClasses = [
      'lookup',
      { 'is-open': this.state.open },
    ];

    const scope = this.props.multi ? null : 'single';

    if (this.props.emailLayout) {
      return (
        <div className={this.prefix(['grid', 'grow', 'p-horizontal--small'])}>
          <label className={this.prefix(['email-composer__label', 'align-middle'])} htmlFor={this.props.id}>
            {this.props.inputLabel}
          </label>
          <FormElement
            {...rest}
            className={this.prefix(sldsClasses, this.props.className)}
            data-select={scope}
            data-scope={scope}
          >
            {this.input()}
            {this.selections()}
            {this.lookupList()}
          </FormElement>
        </div>
      );
    }

    return (
      <div>
        <FormElement
          {...rest}
          className={this.prefix(sldsClasses, this.props.className)}
          data-select={scope}
          data-scope={scope}
        >
          <FormElementLabel id={this.props.id} label={this.props.inputLabel} />
          {this.input()}
          {this.selections()}
          {this.lookupList()}
        </FormElement>
        {this.lookupListTable()}
      </div>
    );
  }
}

export default enhanceWithClickOutside(Lookup);

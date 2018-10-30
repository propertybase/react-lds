import React from 'react';
import { mount } from 'enzyme';

import { LookupRaw as Lookup } from '../Lookup';

describe('<Lookup />', () => {
  let mounted = null;
  let props = {};

  const sampleData = [
    {
      id: '1',
      email: 'something@example.com',
      label: 'Something',
      meta: 'Very meta',
      objectType: 'contact',
    },
    {
      id: '2',
      email: 'really@example.com',
      label: 'Really',
      objectType: 'contact',
    },
    {
      id: '3',
      email: 'notso@example.com',
      label: 'Not so',
      objectType: 'contact',
    },
    {
      id: '4',
      email: 'muchuseful@example.com',
      label: 'Much useful',
      objectType: 'contact',
    },
    {
      id: '5',
      email: 'ofanytype@example.com',
      label: 'Of any type',
      objectType: 'contact',
    },
    {
      id: '6',
      email: 'ofsometype@example.com',
      label: 'Of some type',
      objectType: 'account',
    },
    {
      id: '7',
      email: 'ofsomerecordtype@example.com',
      label: 'Of some record type',
      objectType: 'record',
    },
  ];

  const loadFn = () => sampleData;

  const onChange = () => {};

  beforeEach(() => {
    props = {
      'data-scope': 'single',
      'data-select': 'multi',
      id: 'lookup',
      inputLabel: 'Accounts',
      listLabel: 'Recent Accounts',
      placeholder: 'Search Accounts',
      load: loadFn,
      onChange,
    };

    mounted = mount(<Lookup {...props} />);
  });

  it('renders an input by default', () => {
    expect(mounted.find('.slds-form-element__control input').length).toBe(1);
    expect(mounted.find('.slds-pill_container').length).toBe(0);
  });

  it('renders a label', () => {
    expect(mounted.find('.slds-form-element__label').text()).toEqual(props.inputLabel);
  });

  it('renders a placeholder', () => {
    expect(mounted.find('input').prop('placeholder')).toEqual(props.placeholder);
  });

  it('renders scope attributes', () => {
    expect(mounted.find('.slds-form-element').prop('data-scope')).toEqual('single');
    mounted.setProps({ multi: true });
    expect(mounted.find('.slds-form-element').prop('data-scope')).toEqual(null);
  });

  it('renders an alternate email layout', () => {
    mounted.setProps({ emailLayout: true });
    expect(mounted.find('input').hasClass('slds-input_bare')).toBeTruthy();
    expect(mounted.find('.slds-form-element__label').length).toBe(0);
    expect(mounted.find('.slds-grid .slds-email-composer__label').length).toBe(1);
  });

  it('renders a list label', () => {
    mounted.setState({ open: true, loaded: sampleData });
    expect(mounted.find('.slds-lookup__item_label').text()).toBe(props.listLabel);
  });

  it('renders a lookup list', () => {
    mounted.setState({ open: true, loaded: sampleData });
    expect(mounted.find('.slds-lookup__list .slds-lookup__item-action').length).toBe(7);
  });

  it('renders a lookup list with table layout', () => {
    mounted.setState({ open: true, loaded: sampleData });
    mounted.setProps({ table: true, tableFields: [{ name: 'label', label: 'Name' }] });
    expect(mounted.find('.slds-lookup__list .slds-lookup__item-action').length).toBe(0);
    expect(mounted.find('table tbody tr').length).toBe(7);
  });

  it('renders a lookup list with table layout and multiple columns', () => {
    const tableFields = [{ name: 'label', label: 'Name' }, { name: 'email', label: 'Email' }];
    mounted.setState({ open: true, loaded: sampleData });
    mounted.setProps({ table: true, tableFields });
    const row = mounted.find('table tbody tr').first().children();
    expect(row.length).toBe(2);
    expect(row.at(0).text()).toBe('Something');
    expect(row.at(1).text()).toBe('something@example.com');
  });

  it('renders lookup items correctly', () => {
    mounted.setState({ open: true, loaded: [sampleData[0]] });

    const firstData = sampleData[0];
    const firstResult = mounted.find('.slds-lookup__item-action').first();
    expect(firstResult.find('.slds-lookup__result-text').text()).toEqual(firstData.label);
    expect(firstResult.find('.slds-lookup__result-meta').text()).toEqual(firstData.meta);
    expect(firstResult.find('IconSVG').first().prop('icon')).toEqual(firstData.objectType);
  });

  it('renders a list only when there is loaded data', () => {
    mounted.setState({ open: true });
    expect(mounted.find('.slds-lookup__menu').length).toBe(0);
    mounted.setState({ loaded: sampleData });
    expect(mounted.find('.slds-lookup__menu').length).toBe(1);
  });

  it('renders selections correctly', () => {
    mounted.setState({ selected: [sampleData[0]] });
    const firstData = sampleData[0];
    const result = mounted.find('.slds-pill');
    expect(result.find('button.slds-pill__remove').length).toBe(1);
    expect(result.find('.slds-pill__label').text()).toEqual(firstData.label);
    expect(result.find('IconSVG').first().prop('icon')).toEqual(firstData.objectType);
  });

  it('renders a selection and no input if there are selected items', () => {
    mounted.setState({ selected: [sampleData[0]] });
    expect(mounted.find('input').length).toBe(0);
    expect(mounted.find('.slds-pill_container .slds-pill').length).toBe(1);
  });

  it('renders as a multi lookup', () => {
    mounted.setProps({ multi: true });
    mounted.setState({ selected: sampleData });

    expect(mounted.find('.slds-pill_container .slds-pill').length).toBe(7);
    expect(mounted.find('input').length).toBe(0);
  });

  it('renders the input on multi-result click', () => {
    mounted.setProps({ multi: true });
    mounted.setState({ selected: sampleData });

    mounted.find('.slds-pill_container').simulate('click');
    expect(mounted.find('input').length).toBe(1);
  });

  it('accepts an initial selection', () => {
    props.initialSelection = [sampleData[0]];
    mounted = mount(<Lookup {...props} />);
    expect(mounted.state('selected').length).toBe(1);
  });

  it('renders input hidden label', () => {
    mounted.setProps({ hideLabel: true });
    expect(mounted.find('FormElementLabel').prop('hideLabel')).toBeTruthy();
  });

  it('renders required', () => {
    mounted.setProps({ required: true });
    expect(mounted.find('label > abbr').length).toBe(1);
  });

  it('renders error with message', () => {
    mounted.setProps({ error: 'Error' });
    expect(mounted.find('.slds-form-element').hasClass('slds-has-error')).toBeTruthy();
    expect(mounted.find('.slds-form-element__help').exists()).toBeTruthy();
  });

  it('renders error without error message', () => {
    mounted.setProps({ error: 'Error', hideErrorMessage: true });
    expect(mounted.find('.slds-form-element').hasClass('slds-has-error')).toBeTruthy();
    expect(mounted.find('.slds-form-element__help').exists()).toBeFalsy();
  });

  it('calls the load function onChange', () => {
    const mockFunction = jest.fn();
    mounted.setProps({ load: mockFunction });
    const input = mounted.find('input');
    input.simulate('change');

    setTimeout(() => {
      expect(mockFunction).toBeCalled();
    }, 600);
  });

  it('calls the load function onFocus', () => {
    const mockFunction = jest.fn();
    mounted.setProps({ load: mockFunction, loadOnFocus: true });
    const input = mounted.find('input');
    input.simulate('focus');
    setTimeout(() => {
      expect(mockFunction).toBeCalled();
    }, 600);
  });

  it('calls the load function onMount', () => {
    const mockFunction = jest.fn();
    mounted = mount(<Lookup {...props} load={mockFunction} loadOnMount />);

    setTimeout(() => {
      expect(mockFunction).toBeCalled();
    }, 600);
  });

  it('attaches an onFocus handler', () => {
    const mockFunction = jest.fn();
    mounted.setProps({ onFocus: mockFunction });
    const input = mounted.find('input');
    input.simulate('focus');
    expect(mockFunction).toBeCalled();
  });

  it('sets a selections on lookup item click', () => {
    mounted.setState({ open: true, loaded: sampleData, selected: [] });
    mounted.find('.slds-lookup__list li > span').first().simulate('click');
    expect(mounted.find('.slds-pill_container .slds-pill').length).toBe(1);
  });

  it('sets data-highlighted to the currently highlighted listItem-ID', () => {
    mounted.setState({ open: true, loaded: sampleData, selected: [] });
    mounted.find('.slds-lookup__list li > span').first().simulate('mouseOver');
    expect(mounted.find('input').prop('aria-activedescendant')).toBe('1');
  });

  it('sets aria-expanded on input when openend', () => {
    mounted.setState({ open: true });
    expect(mounted.find('input').prop('aria-expanded')).toBeTruthy();
    expect(mounted.find('.slds-form-element').hasClass('slds-is-open')).toBeTruthy();
  });

  it('shows the input if the selection is cleared', () => {
    mounted.setState({ selected: [sampleData[0]] });
    expect(mounted.find('input').length).toBe(0);
    mounted.find('button.slds-pill__remove').simulate('click');
    expect(mounted.find('input').length).toBe(1);
  });

  it('shows the input if multi selection is cleared', () => {
    mounted.setProps({ multi: true });
    mounted.setState({ selected: [sampleData[0], sampleData[1]] });
    expect(mounted.find('input').length).toBe(0);
    mounted.find('.slds-pill__remove').first().simulate('click');
    mounted.find('.slds-pill__remove').first().simulate('click');
    expect(mounted.find('input').length).toBe(1);
  });

  it('subtracts selected items from displayed items', () => {
    mounted.setState({ open: true, loaded: sampleData, selected: [sampleData[0]] });
    expect(mounted.find('.slds-lookup__list li').length).toBe(6);
    expect(mounted.find('.slds-lookup__result-text').first().text()).toBe(sampleData[1].label);
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('div.slds-lookup').hasClass('foo')).toBeTruthy();
    expect(mounted.find('div.slds-lookup').prop('data-test')).toEqual('bar');
  });

  it('resets selection & loading state when the objectType of the lookup changes', () => {
    mounted.setState({ selected: sampleData, loaded: sampleData });
    mounted.setProps({ objectType: 'newObject' });
    expect(mounted.state('selected').length).toEqual(0);
    expect(mounted.state('loaded').length).toEqual(0);
  });

  it('works as a controlled component', () => {
    mounted.setProps({ selection: sampleData, initialSelection: null });
    expect(mounted.state('selected').length).toEqual(7);
    mounted.setProps({ selection: [] });
    expect(mounted.state('selected').length).toEqual(0);
  });
});

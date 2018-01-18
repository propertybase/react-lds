import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';

describe('<Button />', () => {
  let props = {};
  let mounted = null;

  beforeEach(() => {
    props = {
      onClick: () => {}
    };
    mounted = shallow(<Button {...props} />);
  });


  it('renders the correct markup', () => {
    expect(mounted.hasClass('slds-button')).toBeTruthy();
  });

  it('renders children', () => {
    const child = <div className="foo" />;
    mounted.setProps({ children: child });
    expect(mounted.contains(child)).toBeTruthy();
  });

  it('renders a title', () => {
    mounted.setProps({ title: 'Title' });
    expect(mounted.text()).toEqual('Title');
  });

  it('renders a value', () => {
    mounted.setProps({ value: 'Value' });
    expect(mounted.prop('value')).toEqual('Value');
  });

  it('renders as disabled', () => {
    mounted.setProps({ disabled: true });
    expect(mounted.prop('disabled')).toBeTruthy();
  });

  it('renders as selected', () => {
    mounted.setProps({ selected: true });
    expect(mounted.find('.slds-button').hasClass('slds-is-selected')).toBeTruthy();
  });

  it('attaches an onClick handler', () => {
    const fn = jest.fn();
    mounted.setProps({ onClick: fn });
    mounted.simulate('click');
    expect(fn).toBeCalled();
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('.slds-button').hasClass('foo')).toBeTruthy();
    expect(mounted.find('.slds-button').prop('data-test')).toEqual('bar');
  });

  it('applies flavoring', () => {
    mounted.setProps({ flavor: 'brand' });
    expect(mounted.find('.slds-button').hasClass('slds-button_brand')).toBeTruthy();
    mounted.setProps({ flavor: ['brand', 'icon'] });
    expect(mounted.find('.slds-button').hasClass('slds-button_brand')).toBeTruthy();
    expect(mounted.find('.slds-button').hasClass('slds-button_icon')).toBeTruthy();
  });

  it('applies sizes', () => {
    mounted.setProps({ size: 'x-small' });
    expect(mounted.find('.slds-button').hasClass('slds-button_x-small')).toBeTruthy();
  });

  it('renders with a tag as well', () => {
    mounted.setProps({ href: '#' });
    expect(mounted.hasClass('slds-button')).toBeTruthy();
    expect(mounted.type()).toBe('a');
  });
});

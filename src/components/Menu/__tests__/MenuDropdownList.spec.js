import React from 'react';
import { shallow } from 'enzyme';

import MenuDropdownList from '../MenuDropdownList';

describe('<MenuDropdownList />', () => {
  let mounted = null;

  const children = [<li key="1">one</li>, <li key="2">two</li>];

  beforeEach(() => {
    mounted = shallow(<MenuDropdownList>{children}</MenuDropdownList>);
  });

  it('renders children inside <ul></ul>', () => {
    expect(mounted.find('ul').contains(children)).toBeTruthy();
  });

  it('renders optional header', () => {
    mounted.setProps({ header: 'pink' });

    const header = mounted.find('div > div').first();
    expect(header.hasClass('slds-dropdown__header')).toBeTruthy();
    expect(header.find('span').hasClass('slds-text-title_caps')).toBeTruthy();
    expect(header.text()).toEqual('pink');
  });

  it('adds optional height class', () => {
    mounted.setProps({ height: 5 });
    expect(mounted.find('ul').hasClass('slds-dropdown_length-5')).toBeTruthy();
  });

  it('adds optional heightIcon class', () => {
    mounted.setProps({ heightIcon: 5 });
    expect(mounted.find('ul').hasClass('slds-dropdown_length-with-icon-5')).toBeTruthy();
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('div').hasClass('foo')).toBeTruthy();
    expect(mounted.find('div').prop('data-test')).toEqual('bar');
  });
});

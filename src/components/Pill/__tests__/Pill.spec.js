import React from 'react';
import { shallow } from 'enzyme';

import Pill from '../Pill';
import { Icon, Avatar } from '../../..';

describe('<Pill />', () => {
  let props = {};
  let mounted = null;

  beforeEach(() => {
    props = {
      title: 'A title',
      label: 'A label',
    };
    mounted = shallow(<Pill {...props} />);
  });

  it('renders as a <span> when no url is passed', () => {
    expect(mounted.find('span.slds-pill__label').length).toBe(1);
  });

  it('renders as an <a> when an url is passed', () => {
    mounted.setProps({ url: '#foo' });
    expect(mounted.find('a.slds-pill__label').length).toBe(1);
  });

  it('renders a close-button when onClose prop is given', () => {
    mounted.setProps({ onClose: () => {} });
    expect(mounted.find('.slds-pill__remove').length).toBe(1);
  });

  it('does not render a close-button when onClose prop is not given', () => {
    expect(mounted.find('.slds-pill__remove').length).toBe(0);
  });

  it('renders a label', () => {
    expect(mounted.find('.slds-pill__label').text()).toEqual(props.label);
  });

  it('renders a title-attribute', () => {
    expect(mounted.find('.slds-pill__label').props().title).toEqual(props.title);
  });

  it('renders a portrait', () => {
    const portrait = (<Avatar src="foo" />);
    mounted.setProps({ portrait });
    expect(mounted.find('.slds-pill__icon_container').length).toBe(1);
  });

  it('renders an icon', () => {
    const icon = (<Icon icon="delete" sprite="utility" />);
    mounted.setProps({ icon });
    expect(mounted.find('.slds-pill__icon_container').length).toBe(1);
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('.slds-pill').hasClass('foo')).toBeTruthy();
    expect(mounted.find('.slds-pill').prop('data-test')).toEqual('bar');
  });
});

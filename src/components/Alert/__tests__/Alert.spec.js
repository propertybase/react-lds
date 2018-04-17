import React from 'react';
import { mount } from 'enzyme';

import Alert from '../Alert';

describe('<Alert />', () => {
  let mounted = null;
  let props = {};

  const child = <p>Foobar</p>;

  beforeEach(() => {
    props = {
      title: 'foo',
    };

    mounted = mount(<Alert {...props}>{child}</Alert>);
  });

  it('renders the correct markup', () => {
    const container = mounted.find('.slds-notify_container');
    const notification = container.find('.slds-notify');
    expect(notification.find('button').length).toBe(1);
    expect(notification.find('button > .slds-assistive-text').length).toBe(1);
    expect(notification.find('button > .slds-assistive-text').length).toBe(1);
    expect(notification.contains(child)).toBeTruthy();
  });

  it('renders large close icons for toasts', () => {
    mounted.setProps({ toast: true });
    expect(mounted.find('button svg').hasClass('slds-button__icon_large')).toBeTruthy();

    mounted.setProps({ toast: false });
    expect(mounted.find('button svg').hasClass('slds-button__icon_large')).toBeFalsy();
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('.slds-notify').hasClass('foo')).toBeTruthy();
    expect(mounted.find('.slds-notify').prop('data-test')).toEqual('bar');
  });
});

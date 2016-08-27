jest.unmock('../Notification');

import React from 'react';
import Notification from '../Notification';
import { mount } from 'enzyme';

describe('<Notification />', () => {
  let mounted = null;
  let props = {};

  const child = (<p>Foobar</p>);

  const context = { assetBasePath: '/', cssPrefix: 'slds-' };
  const childContextTypes = { assetBasePath: React.PropTypes.string, cssPrefix: React.PropTypes.string };
  const options = { context, childContextTypes };

  beforeEach(() => {
    props = {
      title: 'foo',
    };

    mounted = mount(<Notification {...props}>{child}</Notification>, options);
  });

  it('renders the correct markup', () => {
    const container = mounted.find('.slds-notify_container');
    const notification = container.find('.slds-notify');
    expect(notification.find('button').length).toBe(1);
    expect(notification.find('button > .slds-assistive-text').length).toBe(1);
    expect(notification.find('> .slds-assistive-text').length).toBe(1);
    expect(notification.contains(child)).toBeTruthy();
  });

  it('renders non-inverse buttons for the warning theme', () => {
    mounted.setProps({ toast: true, theme: 'info' });
    expect(mounted.find('button').hasClass('slds-button--icon-inverse')).toBeTruthy();

    mounted.setProps({ theme: 'warning' });
    expect(mounted.find('button').hasClass('slds-button--icon-inverse')).toBeFalsy();
  });

  it('renders large close icons for toasts', () => {
    mounted.setProps({ toast: true });
    expect(mounted.find('button svg').hasClass('slds-button__icon--large')).toBeTruthy();

    mounted.setProps({ toast: false, alert: true });
    expect(mounted.find('button svg').hasClass('slds-button__icon--large')).toBeFalsy();
  });
});

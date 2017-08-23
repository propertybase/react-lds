import React from 'react';
import { shallow } from 'enzyme';

import flavorable from '../flavorable';

describe('flavorable()', () => {
  let mounted = null;
  const DummyComponent = () => (<div>it works</div>);

  DummyComponent.flavors = [
    'strawberry',
    'cherry',
  ];

  beforeEach(() => {
    const Dummy = flavorable(DummyComponent, 'apple');
    mounted = shallow(<Dummy />);
  });

  it('renders a valid flavor', () => {
    mounted.setProps({ strawberry: true });
    expect(mounted.hasClass('slds-apple_strawberry')).toBeTruthy();
  });

  it('renders multiple flavors', () => {
    mounted.setProps({ strawberry: true, cherry: true });
    expect(mounted.hasClass('slds-apple_strawberry')).toBeTruthy();
    expect(mounted.hasClass('slds-apple_cherry')).toBeTruthy();
  });

  it('does not render invalid flavors', () => {
    mounted.setProps({ blueberry: true });
    expect(mounted.hasClass('slds-apple_blueberry')).toBeFalsy();
  });

  it('keeps existing sldsClasses and adds flavors', () => {
    mounted.setProps({ strawberry: true, className: 'banana' });
    expect(mounted.hasClass('slds-apple_strawberry')).toBeTruthy();
    expect(mounted.hasClass('banana')).toBeTruthy();
  });

  it('keeps existing sldsClasses', () => {
    mounted.setProps({ className: 'banana' });
    expect(mounted.hasClass('banana')).toBeTruthy();
  });
});

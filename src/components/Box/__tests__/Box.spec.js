jest.unmock('../Box');

import React from 'react';
import { shallow } from 'enzyme';
import { Box } from '../Box';

describe('<Box />', () => {
  let mounted = null;

  const context = { cssPrefix: 'slds-' };
  const childContextTypes = { cssPrefix: React.PropTypes.string };
  const options = { context, childContextTypes };

  beforeEach(() => {
    mounted = shallow(<Box />, options);
  });

  it('renders the correct markup', () => {
    expect(mounted.hasClass('slds-box')).toBeTruthy();
  });

  it('renders children', () => {
    const child = <div className="foo">bar</div>;
    mounted.setProps({ children: child });

    expect(mounted.contains(child)).toBeTruthy();
  });

  it('renders different sizes', () => {
    mounted.setProps({ size: 'small' });
    expect(mounted.hasClass('slds-box--small')).toBeTruthy();
  });
});

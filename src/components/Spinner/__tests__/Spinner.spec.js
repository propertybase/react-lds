import React from 'react';
import { shallow } from 'enzyme';

import { Spinner } from '../Spinner';

describe('<Spinner />', () => {
  let mounted = null;
  let props = {};

  beforeEach(() => {
    props = {
      size: 'small',
    };

    mounted = shallow(<Spinner {...props} />);
  });

  it('renders the correct markup', () => {
    expect(mounted.find('.slds-spinner_container').length).toBe(1);
    expect(mounted.find('.slds-spinner').length).toBe(1);
    expect(mounted.find('.slds-spinner__dot-a').length).toBe(1);
    expect(mounted.find('.slds-spinner__dot-b').length).toBe(1);
    expect(mounted.find('.slds-spinner_container').children().length).toBe(1);
    expect(mounted.find('.slds-spinner').children().length).toBe(2);
  });

  it('renders sizes', () => {
    mounted.setProps({ size: 'large' });
    expect(mounted.find('.slds-spinner').hasClass('slds-spinner--large')).toBeTruthy();
  });
  it('renders new sizes added in 2.3.x', () => {
    mounted.setProps({ size: 'xx-small' });
    expect(mounted.find('.slds-spinner').hasClass('slds-spinner--xx-small')).toBeTruthy();
  });
  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('.slds-spinner').hasClass('foo')).toBeTruthy();
    expect(mounted.find('.slds-spinner').prop('data-test')).toEqual('bar');
  });
});

import React from 'react';
import { mount } from 'enzyme';

import { getUniqueHash } from '../../../utils';
import Checkbox from '../Checkbox';

describe('<Checkbox />', () => {
  let props = {};
  let mounted = null;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      id: 'textarea-id',
      label: 'some label',
    };

    mounted = mount(<Checkbox {...props} />);
  });

  it('renders the component and attaches the id', () => {
    const checkbox = mounted.find(Checkbox);
    expect(checkbox.length).toEqual(1);
    expect(checkbox.prop('id')).toEqual(props.id);
  });

  it('attaches an onChange handler', () => {
    const textarea = mounted.find('input[type="checkbox"]');
    const event = { target: { value: 'foo' } };
    textarea.simulate('change', event);

    expect(props.onChange.mock.calls[0][0].target.value).toEqual('foo');
  });

  it('renders required', () => {
    mounted.setProps({ required: true });
    expect(mounted.find('FormElement').prop('required')).toBeTruthy();
    expect(mounted.find('.slds-required').length).toBe(1);
  });

  it('renders disabled', () => {
    mounted.setProps({ disabled: true });
    expect(mounted.find('input[type="checkbox"]').props().disabled).toBeTruthy();
  });

  it('hides the label', () => {
    mounted.setProps({ hideLabel: true });
    expect(mounted.find('span.slds-assistive-text').length).toBe(1);
  });

  it('labels the checkbox with an error', () => {
    mounted.setProps({ error: 'shit' });
    const hash = getUniqueHash('shit', props.id);
    expect(mounted.find('input').prop('aria-describedby')).toEqual(hash);
  });

  it('hides the error message', () => {
    mounted.setProps({ error: 'shit', hideErrorMessage: true });
    expect(mounted.find('.slds-form-element__help').length).toEqual(0);
    expect(mounted.find('input').prop('aria-describedby')).toEqual(null);
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('input[type="checkbox"]').hasClass('foo')).toBeTruthy();
    expect(mounted.find('input[type="checkbox"]').prop('data-test')).toEqual('bar');
  });
});

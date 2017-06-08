import React from 'react';
import { shallow } from 'enzyme';

import { Row } from '../Row';

describe('<Row />', () => {
  let mounted = null;

  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  beforeEach(() => {
    const frag = table.appendChild(tbody);
    mounted = shallow(<Row />, { attachTo: frag });
  });

  it('renders children', () => {
    const child = <td className="foo" />;
    mounted.setProps({ children: child });
    expect(mounted.find('tr').contains(child)).toBeTruthy();
  });

  it('adds a class for header rows', () => {
    mounted.setProps({ head: true });
    expect(mounted.find('tr').hasClass('slds-text-title--caps')).toBeTruthy();
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('tr').hasClass('foo')).toBeTruthy();
    expect(mounted.find('tr').prop('data-test')).toEqual('bar');
  });
});

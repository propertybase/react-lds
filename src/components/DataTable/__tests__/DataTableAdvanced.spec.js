import React from 'react';
import { mount } from 'enzyme';

import DataTable from '../DataTable';

describe('<DataTable />', () => {
  let mounted = null;

  beforeEach(() => {
    const props = {
      data: [],
      onSelect: () => {},
    };
    mounted = mount(<DataTable {...props} />);
  });

  it('renders a table', () => {
    expect(mounted.find('.slds-table')).toHaveLength(1);
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('table').hasClass('foo')).toBeTruthy();
    expect(mounted.find('table').prop('data-test')).toEqual('bar');
  });
});

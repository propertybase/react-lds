import React from 'react';
import { mount } from 'enzyme';

import RecordHome from '../RecordHome';

describe('<RecordHome />', () => {
  let mounted;

  beforeEach(() => {
    mounted = mount(
      <RecordHome
        icon={{ sprite: 'utility', icon: 'unicornz' }}
        title="foo"
        recordType="unicornz"
        headerButtons="button123"
        detailItems={[
          { title: 'detail1', content: 'detailcontent1' },
          { title: 'detail2', content: 'detailcontent2' },
        ]}
      />
    );
  });

  it('contains the icon', () => {
    expect(mounted.find('svg').length).toEqual(1);
  });

  it('contains the title', () => {
    expect(mounted.find('h1').first().text()).toEqual('foo');
  });

  it('contains the recordType', () => {
    expect(mounted.find('p.slds-text-title--caps').first().text()).toEqual('unicornz');
  });

  it('contains the headerButtons', () => {
    expect(mounted.find('div.slds-col').at(1).text()).toEqual('button123');
  });

  it('contains detail items', () => {
    const detailItems = mounted.find('li.slds-page-header__detail-block');
    expect(detailItems.length).toEqual(2);
    expect(detailItems.first().find('p.slds-text-title').text()).toEqual('detail1');
    expect(detailItems.first().find('p.slds-text-body--regular').text()).toEqual('detailcontent1');
    expect(detailItems.at(1).find('p.slds-text-title').text()).toEqual('detail2');
    expect(detailItems.at(1).find('p.slds-text-body--regular').text()).toEqual('detailcontent2');
  });

  it('applies className and rest-properties', () => {
    mounted.setProps({ className: 'foo', 'data-test': 'bar' });
    expect(mounted.find('.slds-page-header').hasClass('foo')).toBeTruthy();
    expect(mounted.find('.slds-page-header').prop('data-test')).toEqual('bar');
  });
});
